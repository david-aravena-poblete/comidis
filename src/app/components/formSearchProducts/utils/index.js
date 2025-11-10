import {searchDocuments} from "@/serverless/db/searchProductsInInventary/"

export const getQueryUser = async(query) => {
    console.log(query)
    const documents = await searchDocuments(query)
    console.log("documents: ", documents)
}