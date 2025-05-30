import { useState } from 'react'
import { createAsyncGraphQLAction, createQueryStrLazy, transformAndCacheGraphQLVectorResult, updateItemsFromGraphQLResult, useAsyncAction } from "@hrbolek/uoisfrontend-gql-shared"
import { CreateDelayer, ErrorHandler, Input, LoadingSpinner, SimpleCardCapsule } from "@hrbolek/uoisfrontend-shared"
import './styles.css'
const UserReadPageQuery = createQueryStrLazy(
`query UserQueryRead($skip: Int, $limit: Int, $orderby: String = "surname", $where: UserInputWhereFilter) {
  result: userPage(skip: $skip, limit: $limit, orderby: $orderby, where: $where) {
    __typename
    name
    surname
    fullname
    email

  }
}`    
)

const CacheId = "f9fcea7a-f469-485c-a543-e7de6c3daf19"
const UserPageReadAsyncAction = createAsyncGraphQLAction(
    UserReadPageQuery,
    updateItemsFromGraphQLResult,
    transformAndCacheGraphQLVectorResult(CacheId)
)

export const InputUser = ({onChange=(user)=>null, onBlur=(user)=>null, id, label="", className="", ...props}) => {
    const { loading, error, fetch } = useAsyncAction(UserPageReadAsyncAction, {}, {deferred: true})
    const [searchStr, setSearchStr] = useState("")
    const [users, setUsers] = useState([])
    const [selected, setSelected] = useState(null)
    const [delayer] = useState(() => CreateDelayer())
    const loadUsers = async(searchStr) => {
        const where = {"_or":[
            {"name": {"_ilike": `%${searchStr}%`}}, 
            {"surname": {"_ilike": `%${searchStr}%`}}
        ]}
        const data = await fetch({where})
        const options = data?.data?.result?.options
        // console.log("user data", options)
        setUsers(prev => options || [])
    }
    const handleChange = (e) => {
        const searchStr = e.target.value
        setSearchStr(prev => searchStr)
        if(searchStr.length > 3)
            delayer(() => loadUsers(searchStr))
    }
    
    const handleSelectUser = (user) => {
        // setSearchStr(user.fullname);
        // setUsers([]); // Clear suggestions
        setSelected(prev => user)
        const e = {target: {id, value: user.id, user}}
        onChange(e); // Trigger the onChange callback
    };

    const classnames = className.split(" ")
    const buttonclassnames = ["btn btn-outline-success"].concat(classnames).filter((item, index, self) => self.indexOf(item) === index);
    const buttomclassname = buttonclassnames.join(" ")
    return (<div id="userdynamicselect" class="user-input-root">
        {loading && <LoadingSpinner />}
        {error && <ErrorHandler errors={error} />}
        {selected && (<SimpleCardCapsule title={label}>
            <span className={buttomclassname} onClick={() => setSelected(null)}>
                {selected.name} {selected.surname}
            </span>
            {/* <span className='btn btn-outline-success' onClick={onChange}><PlusLg /></span> */}
        </SimpleCardCapsule>)}
        {!selected && <>
            <Input id={id} label={label} className={className} {...props} defaultValue={searchStr} onChange={handleChange} onBlur={handleChange} />
            <div id="userhints" class="user-input-hints">
                {users.map(user => 
                <div 
                    key={user.id}
                    onClick={() => handleSelectUser(user)}
                    class="user-input-content"
                    onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#f9f9f9")}
                    onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "white")}
                >
                    <span>
                        {user.fullname}
                    </span>
                </div>)}
            </div>
        </>}
    </div>
    )
}