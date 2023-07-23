import Link from "../model/linkHandler";
import {responseError, responseOK} from "../utils/responseJSON";

const tutorialHome:object = {
    get_All_Links : "/api/v1/link",
    search_link :"/api/v1/link/{name}",
    create_link : "/api/v1/link",
    delete_link : "/api/v1/link",
    update_link: "/api/v1/link"
}

const model = new Link();

export const homepage = ({_, res}: { _: any, res: any }) => {
    res.status(200)
        .json(responseOK("tutorial", tutorialHome))
}

export const searchByLinkName = async (req:any, res:any) => {
    try {
        const { name } = req.params;
        const result = await model.findLinkByName(name);
        return res.status(200)
            .json(responseOK("this is you looking for?", { result : result }))
    }
    catch (e) {
        console.log(e)
        res.status(401).json(responseError("link not found?"))
    }

}
export const getAllLinks = async(_:any, res:any) => {
    const result:object = await model.getAllLinks()
    res.status(200)
        .json(responseOK("this is all link", result))
    return result
};

export const createLink = async (req:any, res:any) => {
    try {
        const { name, link} = req.body;
        !name && res.status(401).json(responseError("link doesn't have name"));
        !link && res.status(401).json(responseError("link doesn't have link"));
        const result = await model.create(name, link)
        return res.status(201)
            .json(responseOK("link has been created", result))
    }
    catch (err) {
        console.log(err)
        return res.status(401).json(responseError("link already exist delete or update is only option"));
    }
}

export const deleteLink = async (req:any, res:any) => {
    try {
        const { name } = req.body;
        !name && res.status(401).json(responseError("link doesn't have name"));
        await model.deleteLinkByName(name)
        return res.json(responseOK("link has been delete", { result : "link has been deleted"}))
    }
    catch (e) {
        console.log(e)
        return res.status(401).json(responseError("link you're looking for not exist"))
    }
}

export const urlShortener = async (req:any, res:any) => {
    try {
        const { name } = req.params
        const { linkDefault }:any= await model.findLinkByName(name);
        console.log(linkDefault)
        if (!linkDefault.includes("http")) return res.redirect("https://" + linkDefault)
        return res.redirect(linkDefault)
    } catch (e) {
        console.log(e)
        return res.status(401)
            .json(responseError("something bad happens"))
    }
}

export const updateLink = async (req:any, res:any) => {
    try {
        const { name, new_name, link} = req.body;
        !name && res.status(401).json(responseError("looking for link's name but not found"));
        !new_name && res.status(401).json(responseError("looking for link's new_name but not found"));
        !link && res.status(401).json(responseError("looking for link but not found"));
        await model.updateLinkByName(name, new_name, link);
        return res.json(responseOK("link has been updated", { result : "link has been updated"}))
    } catch (e) {
        console.log(e);
        return res.status(401).json(responseError("link you're looking for not exist"))
    }
}
