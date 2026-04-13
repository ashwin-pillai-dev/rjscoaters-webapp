'use client';

import { Sidebar } from 'flowbite-react';
import { BiCategoryAlt } from 'react-icons/bi';
import { BsFillPersonLinesFill } from 'react-icons/bs';
import { HiChartPie, HiShoppingBag, HiTable, HiUser } from 'react-icons/hi';
import { TbTableShare } from 'react-icons/tb';


export default function DefaultSidebar() {
    return (
        <aside
            className="fixed top-0 left-0 z-40 w-64 h-screen pt-14 transition-transform -translate-x-full bg-white border-r border-gray-200 md:translate-x-0 dark:bg-gray-800 dark:border-gray-700"
            aria-label="Sidenav"
            id="drawer-navigation"
        >
            <div className="overflow-y-auto py-5 px-3 h-full bg-white dark:bg-gray-800">
                <Sidebar aria-label="Default sidebar example">
                    <Sidebar.Items>
                        <Sidebar.ItemGroup>
                            <Sidebar.Item
                                href="/admin"
                                icon={HiChartPie}
                            >
                                <p>
                                    Dashboard
                                </p>
                            </Sidebar.Item>

                            <Sidebar.Collapse
                                icon={TbTableShare}
                                label="Masters"
                            >
                                <Sidebar.Item href="/admin/client-type/list">
                                    Client type
                                </Sidebar.Item>
                                {/* <Sidebar.Item href="#">
                                    Sales
                                </Sidebar.Item>
                                <Sidebar.Item href="#">
                                    Refunds
                                </Sidebar.Item>
                                <Sidebar.Item href="#">
                                    Shipping
                                </Sidebar.Item> */}
                            </Sidebar.Collapse>

                            {/* <Sidebar.Item
                                href="#"
                                icon={HiViewBoards}
                                label="Pro"
                                labelColor="dark"
                            >
                                <p>
                                    Kanban
                                </p>
                            </Sidebar.Item>  */}
                            <Sidebar.Item
                               href="/admin/categories/list"
                                icon={BiCategoryAlt}
                            >
                                <p>
                                    Categories
                                </p>
                            </Sidebar.Item>

                            <Sidebar.Item
                                href="/admin/products/list"
                                icon={HiShoppingBag}
                            >
                                <p>
                                    Products
                                </p>
                            </Sidebar.Item>
                            <Sidebar.Item
                                href="/admin/partners/list"
                                icon={HiUser}
                            >
                                <p>
                                    Partners
                                </p>
                            </Sidebar.Item>

                            <Sidebar.Item
                                href="/admin/clients/list"
                                icon={BsFillPersonLinesFill}
                            >
                                <p>
                                    Clients
                                </p>
                            </Sidebar.Item>
                            <Sidebar.Item
                                href="#"
                                icon={HiTable}
                            >
                                <p>
                                    Sign Up
                                </p>
                            </Sidebar.Item>
                        </Sidebar.ItemGroup>
                    </Sidebar.Items>
                </Sidebar>
            </div>
        </aside>
    )
}


