import { createAsyncGraphQLAction, ItemActions, useAsyncAction } from "@hrbolek/uoisfrontend-gql-shared";
import { CreateDelayer, DeleteButton } from "@hrbolek/uoisfrontend-shared";
import { useState } from "react";
import {UserReadAsyncAction, UserUpdateAsyncAction} from "../Queries"
import {useDispatch} from "react-redux"
import {UserMediumEditableContent} from "../Components/"

let value = 0; //sdilena promenna, ktera se meni v onClick funkci - zajistuje to, ze je to sdilene mezi vsemi instancemi komponenty UserData

//nutny import knihovny uoistfrontend-gql-shared
const QueryGroupAsyncAction = createAsyncGraphQLAction(`
query ($pattern: String!) {
    groupPage(where: {name: {_ilike: $pattern}}) {
        __typename
        id
        name
  }
}
`);

//zapise usera do cache
export const updateMembershipsForUser = (jsonData) => async (dispatch, getState, next = (jsonResult)=>jsonResult) => {
    console.log("updateMembershipsForUser", jsonData);
    const membership = jsonData?.data?.membershipInsert;
    if (membership) {
        const {__typename} = membership
        if (__typename === "MembershipGQLModel") {
            //muzu prepokladat, ze membership mi vratil usera
            //vim ze insertasyncaction je vztazena k userovi a tedy si pripravim usera tak, aby byl komplexni
            //budu chtit updatovat usera, tj ve fragmentu membership si vytahnu i memberships usera - viz MembershipInsertAsync
            const {user} = membership.user;
            //itemactions.item_update je akce, dispatch tuto akci vykonava
            //dojde k provedeni stavove fce - vlozi usera do cache
            dispatch(ItemActions.item_update(user))
        }
    }
}


const MemberShipInsertAsyncAction = createAsyncGraphQLAction(`
mutation membershipInsert($userId: UUID!, $groupId: UUID!, $id: UUID, $startdate: DateTime, $enddate: DateTime) {
  membershipInsert(membership: {userId: $userId, groupId: $groupId, id: $id, startdate: $startdate, enddate: $enddate}) {
    ... on MembershipGQLModel { ...Membership }
    ... on InsertError { ...InsertError }
  }
}

fragment InsertError on InsertError {
  __typename
  input
  failed
  msg
}

fragment Membership on MembershipGQLModel {
  __typename
  user {
    id
    name
    surname
    memberships {
        id 
        group {
            id
            name
            grouptype {
                id
                name
            }
        }
    }
  }
  group {
    id
    name
    grouptype {
        id
        name
    }
  }
  startdate
  enddate
}
`) //,updateMembershipsForUser )
//povykonani bude zavolan middleware, ktery zajisti zapis do cache a prekresleni vsech komponent


//komponenta, ktera zobrazuje jednu skupinu
//pri kliknuti da notifikaci userdata - tak se zajisti interaktivita kazde komponenty
const LocalGroup = ({group, onSelect}) => {
    const onClick = () => {
        console.log("LocalGroup.onClick", group.id, group.name);
        //volani onselect - informuju nadrazenou komponentu o vybrane group
        onSelect(group);
    }
    return (
        <div>
            <a onClick={onClick} href="#">{group.name}  [{group.id}]</a>
        </div>
    )
}

const followUpUserUpdate = (user, membership, dispatch) => {
    //new user je entita co ma updatovanou hodnotu vektorove atributu memberships, kterou chci zapsat do cache
    const {__typename} = membership
    if (__typename === "MembershipGQLModel") {
        const {memberships} = user
        const newMemberships = [...memberships, membership]
        const newUser = {...user, memberships: newMemberships}
        dispatch(ItemActions.item_update(newUser))
    }
}

export const UserData = ({user}) => {
    //fetch budeme volat az v onChange
    const {loading, error, fetch} = useAsyncAction(QueryGroupAsyncAction, {}, {deffered: true});
    //bezparametricka odlozena funkce
    //statementy v {} je destrukturalizace, vraci nam klice loading error a fetch, ale ty bychom uz meli podruhe, takze je musime prejmenovat
    const {loading:  loadingInsert, error: errorInsert, fetch: fetchInsert} = useAsyncAction(MemberShipInsertAsyncAction, {}, {deffered: true});

    //provedeme kdyz se zmeni atribut usera co nemeni struturu
    const {fetch : refetchUser} = useAsyncAction(UserReadAsyncAction, {}, {deffered: true});


    const [state, setState] = useState(value); //use state je hook, vraci dve hodnoty - prvni je hodnota, druha je funkce, ktera ji meni
    
    //bude okladat groups, prinasi vektor a ne sklalar
    const [groups, setGroups] = useState([]); //<= toto budeme vizualizovat

    //zpozdovac, ma implicitni timeout
    //zadruhel, je treba to delat jako funkci
    const [delayer, setDelayer] = useState(() => CreateDelayer(500));

    //def. dispatche k alternativnimu reseni
    const dispatch = useDispatch()

    const onClick = () => {
        value = value + 1;
        const newState = state + 1;
        setState(newState);
    }
    
    //chvile, kdy uzivatel klikne na skupinu
    const onSelect = (group) => {
        console.log("UserData.onSelect", group.id, group.name);

        //pripravime parametry pro insert mutaci
        const insertParams = {
            userId: user.id,
            groupId: group.id,
            //zpusob jak na klientovi vygenerovat uuid
            id : crypto.randomUUID(),
            //zde se musi odstranit Z, jinak to neprojde
            startdate: new Date().toISOString().replace("Z", ""),
            enddate: null
        }
        console.log("UserData.onSelect.insertParams", insertParams);
        fetchInsert(insertParams).then(
            // json => refetchUser({id: user.id})
            //alternativa k follow up middleware (jina implementace tehoz):
            json => followUpUserUpdate(user, json, dispatch)
        )
    }

    const onChange = (e) => {
        const data = e.target.value;
        //data jsou to, co uzivatel zadal do inputu
        //necheme hledat pomoci 1 nebo 0 znaku
        //nekdo pise rychle a nechceme zahltit server - posilat packet pri kazdem znaku
        if (data.length > 2) {

            //Old:
            //=========================================================================
            // fetch({pattern: `%${data}%`}).then( //fetch je promise a vraci then
            //     //^procenta jsou literaly, zajistuji hledani substringu kdekoliv
            //         data => data.json() //extrahujeme promise (prislib obaluje response ze serveru)
            //         //^tohle zas vraci promise, takze to musime zabalit do dalsiho then
            // ).then(
            //     json => {
            //         console.log(json);
            //         return json;
            //     }
            // )
            //=========================================================================

            //vypisovani do konzole + delay:
            delayer(() => fetch({pattern: `%${data}%`}).then(
                json => {
                    //z jsonu vytahuju to co potrebuju
                    //otaznik znamena - nejsem si jisty, ze to tam je - pokud to tam neni, tak to vrati null
                    //or zajistuje ze se vrati prazdne pole, bude-li tam null
                    const groups = json?.data?.groupPage || []
                    setGroups(groups);

                    console.log(json);
                    return json;
                }
            ))
            
        }
        console.log("UserData.onChange.data", data); //vypisuje v konzoli hodnotu, pri kazde zmene
    }

    const onDelete = () => {
        console.log("UserData.onDelete")
    }

    return (
        <div>
            Hodnota: {value} Stav: {state}
            <button onClick={onClick} className="btn btn-success">+</button>
            <br/><br/>
            Vyhledani a pridani usera do sklupiny
            <input type="text" defaultValue={"demo"} onChange={onChange} className="form-control"></input>

            {/*
              -tady je c++ koncept vyhodnocovani zleva, pokud je groups null, pak se druha podminka vubec nevyhodnocuje
              -map je metoda ktera ma jako parametr funkci, ktera se zavola pro kazdy prvek v poli
              -vystupy techto funkce se pak vraci jako pole
              -vystupem toho je pole LocalGroup komponent
            */}
            {groups && groups.map((group) => {
                return <LocalGroup key={group.id} group={group} onSelect={onSelect}/>
            })}
            <br/><br/>
            Zmena mailu usera:
            <UserEmailEdit user={user}/>
            <br/>
            <DeleteButton onClick={onDelete}>Delete</DeleteButton>
        </div>
    )
}


export const UserEmailEdit = ({user}) => {
    const {loading, error, fetch} = useAsyncAction(UserUpdateAsyncAction, {}, {deffered: true});
    const onChange = (e) => {
        const email = e.target.value;
        //zachova pro uzivatele stejne hodnoty a zmeni jen email
        const newUser = {...user, email: email}
        console.log("UserEmailEdit.onChange", newUser);
        fetch(newUser)
    }
    const onChange2 = (e) => {
        const newValue = e.target.value;
        const id = e.target.id;
        const newUser = {...user, [id]: newValue}
        //melo by byt zpomaleni fetche
        fetch(newUser)
    }
    return (
        <div>
            {loading && <div>Ukladam...</div>}
            {error && <div>Doslo k chybe: {JSON.stringify(error)}</div>}
            <input type="text" className="form-control" defaultValue={user.email} onChange={onChange}/>
            {/* <Input id={"name"} label={"Jmeno"} className="form-control" defaultValue={user?.email|| "Jmeno"} onChange={onChange2}/> */}
            <UserMediumEditableContent user={user} onChange={onChange2}/>
        </div>
    )
}