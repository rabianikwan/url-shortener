import { Router } from "express";
import {
    createLink,
    deleteLink,
    getAllLinks,
    homepage,
    searchByLinkName,
    updateLink, urlShortener
} from "../controller/routerHandler";

const routes = Router();
const api:string = '/api/v1/link'

routes.get('/', homepage)
routes.get('/:name', urlShortener)
routes.get(api, getAllLinks)
routes.get(api + '/:name', searchByLinkName)
routes.post(api, createLink)
routes.delete(api, deleteLink)
routes.put(api, updateLink)
export default routes;
