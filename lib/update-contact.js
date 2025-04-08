'use server'

import prisma from "./prisma"

export async function updateContact(eventData){
    try {
        const {id, name, email} = eventData
        const adjContact = await prisma.contact.update({
            where:{
                id: id
            },
            data: {
                name, email
            }
        })
        return adjContact
    } catch (error) {
        console.log("Erro ao atualizar contato " + error)
        throw new Error("Erro ao atualizar contato " + error)
        
    }
}