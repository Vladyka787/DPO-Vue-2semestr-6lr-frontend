import Main from "@/pages/Main.vue";
import AddResume from "@/pages/AddResume.vue";
import EditResume from "@/pages/EditResume.vue";
import {createRouter, createWebHashHistory} from "vue-router";

const routes = [
    {
        path: "/",
        component: Main
    },
    {
        path: "/add",
        component: AddResume
    },
    {
        path: "/edit/:id",
        component: EditResume
    },
]

const router = createRouter({
    routes,
    history: createWebHashHistory()
})

export default router;