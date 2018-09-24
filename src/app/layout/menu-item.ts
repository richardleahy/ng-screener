import { IconDefinition } from "@fortawesome/free-solid-svg-icons";

/** Class representing a menu item. */
export class MenuItem {
    /**
     * Menu title
     * @type {string}
     */
    title: string;
    /**
     * Menu path
     * @type {string}
     */
    path?:string;
    /**
     * Menu icon
     * @type {IconDefinition}
     */
    icon?: IconDefinition;
    /**
     * Menu id
     * @type {string}
     */
    id?: string;
    /**
     * Menu children
     * @type {MenuItem[]}
     */
    children?: MenuItem[]
}
