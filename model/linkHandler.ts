import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class Link {
    async getAllLinks() {
        const allLinks = await prisma.link.findMany()
        console.log(allLinks)
        return allLinks;
    };

    async insert(name:string, linkDefault:string, linkModified:string) {
        const create = {name, linkDefault, linkModified}
        await prisma.link.create({
            data : { name : name, linkDefault : linkDefault, linkModified : linkModified }
        })
    };

    async findLinkByName(name:string) {
        const findLink = await prisma.link.findUnique({
            where : { name : name }
        })
        console.log(findLink)
        return findLink
    };

    async updateLinkByName(name:string, newName:string, linkDefault:string, linkModified:string) {
        await prisma.link.update({
            where : { name : name }
            , data : {
            name : newName,
            linkDefault : linkDefault,
            linkModified : linkModified
        }})
    };

    async deleteLinkByName(name:string) {
        await prisma.link.delete({
            where : {
                name : name
            }
        });
        await this.getAllLinks()
    }
}

export default Link;