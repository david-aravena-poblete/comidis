import {searchDocuments} from "@/serverless/db/searchProductsInInventary/"

export const getQueryUser = async(query) => {
    
    const documents = await searchDocuments(query.toLowerCase())
    return documents
}