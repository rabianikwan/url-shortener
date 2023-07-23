import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient();

class Link {
    async getAllLinks() {
        const allLinks = await prisma.link.findMany()
        console.log(allLinks)
        return allLinks;
    };

    async create(name:string, linkDefault:string) {
        const create = { name, linkDefault }
        await prisma.link.create({
            data : {
                name ,
                linkDefault ,
                linkModified : "/" + name }
        })
        return create
    };

    async findLinkByName(name:string) {
        return await prisma.link.findUnique({
            where: {name: name}
        })
    };

    async updateLinkByName(name:string, newName:string, linkDefault:string) {
        await prisma.link.update({
            where : { name }
            , data : {
            name : newName,
            linkDefault,
            linkModified : "/" + newName
        }})
    };

    async deleteLinkByName(name:string) {
        const deleteLink:object = await prisma.link.delete({
            where : { name }
        });
        return deleteLink;
    }
}

export default Link;
