import { INavbarData } from "./helper";

export const navbarData: INavbarData[] = [

    {
        routeLink: 'overview',
        icon: 'assets/icons/user.png',
        label: 'Account Overview',


        // items: [
        //     {
        //         routeLink: 'products/level1.1',
        //         label: 'Level 1.1',
        //         items: [
        //             {
        //                 routeLink: 'products/level2.1',
        //                 label: 'Level 2.1',
        //             },
        //             {
        //                 routeLink: 'products/level2.2',
        //                 label: 'Level 2.2',
        //                 items: [
        //                     {
        //                         routeLink: 'products/level3.1',
        //                         label: 'Level 3.1'
        //                     },
        //                     {
        //                         routeLink: 'products/level3.2',
        //                         label: 'Level 3.2'
        //                     }
        //                 ]
        //             }
        //         ]
        //     },
        //     {
        //         routeLink: 'products/level1.2',
        //         label: 'Level 1.2',
        //     }
        // ]
    },
    {
        routeLink: 'orders',
        icon: 'assets/icons/Bag.png',
        label: 'Orders',
    },
    {
        routeLink: 'likes',
        icon: 'assets/icons/Heart.png',
        label: 'Liked Items',
    },
    {
        routeLink: 'cart',
        icon: 'assets/icons/Stroke 1.png',
        label: 'Cart',
    },
    {
        routeLink: 'review',
        icon: 'assets/icons/Chat.png',
        label: 'Reviews',
        // items: [
        //     {
        //         routeLink: 'coupens/list',
        //         label: 'List Coupens'
        //     },
        //     {
        //         routeLink: 'coupens/create',
        //         label: 'Create Coupens'
        //     }
        // ]
    },
    {
        routeLink: 'refund-transaction',
        icon: 'assets/icons/Message.png',
        label: 'Inbox'
    },
    // {
    //     routeLink: 'refund',
    //     icon: 'fal fa-camera',
    //     label: 'Refund Transactions'
    // },
    {
        routeLink: 'profile',
        icon: 'assets/icons/Activity.png',
        label: 'Analytics'
    }
    ,
    {
        routeLink: 'profile',
        icon: 'assets/icons/Setting.png',
        label: 'Account Settings'
    }
    // {
    //     routeLink: 'Route4',
    //     icon: 'fal fa-cog',
    //     label: 'Route4',
    //     expanded: true,

    //     items: [
    //         {
    //             routeLink: 'settings/profile',
    //             label: 'Profile'
    //         },
    //         {
    //             routeLink: 'settings/customize',
    //             label: 'Customize'
    //         }
    //     ]
    // },
];







export const navbarDataAdmin: INavbarData[] = [

    {
        routeLink: 'overview',
        icon: 'assets/icons/user.png',
        label: 'Account Overview',
    },
    {
        routeLink: 'orders',
        icon: 'assets/icons/Bag.png',
        label: 'Orders',
    },
    {
        routeLink: 'inventory',
        icon: 'assets/icons/Folder.png',
        label: 'Inventory'
    },

    {
        routeLink: 'refund-transaction',
        icon: 'assets/icons/Message.png',
        label: 'Inbox'
    },
    {
        routeLink: 'profile',
        icon: 'assets/icons/Activity.png',
        label: 'Analytics'
    }
    ,
    {
        routeLink: 'profile',
        icon: 'assets/icons/Setting.png',
        label: 'Account Settings'
    }

];