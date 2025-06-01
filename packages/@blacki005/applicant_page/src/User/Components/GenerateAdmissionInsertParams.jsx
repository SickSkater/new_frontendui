//TODO: dodelat jsdoc
export const GenerateAdmissionInsertParams = (program, paymentInfo) => {
    if (!(
            program?.id &&
            program.name &&
            paymentInfo?.id
        ))
    {
        console.error("Unable to generate AdmissionInsertParams, invalid arguments.")
    }
    return {
        id: crypto.randomUUID(),
        programId: program.id,
        paymentInfoId: paymentInfo.id,
        name: program.name,
        nameEn: program.nameEn,
        applicationStartDate: new Date().toISOString().slice(0, -1), // Odstranění "Z"
        applicationLastDate: new Date(new Date().setDate(new Date().getDate() + 30)).toISOString().slice(0, -1),
        endDate: new Date(new Date().setDate(new Date().getDate() + 60)).toISOString().slice(0, -1),
        conditionDate: new Date(new Date().setDate(new Date().getDate() + 45)).toISOString().slice(0, -1),
        paymentDate: new Date(new Date().setDate(new Date().getDate() + 15)).toISOString().slice(0, -1),
        conditionExtendedDate: null,
        requestConditionExtendDate: null,
        requestExtraConditionsDate: null,
        requestExtraDateDate: null,
        examStartDate: new Date(new Date().setDate(new Date().getDate() + 50)).toISOString().slice(0, -1), // Odstranění "Z"
        examLastDate: new Date(new Date().setDate(new Date().getDate() + 55)).toISOString().slice(0, -1), // Odstranění "Z"
    }
}