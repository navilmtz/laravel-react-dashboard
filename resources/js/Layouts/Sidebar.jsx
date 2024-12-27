import React from 'react';
import menuData from '../data/menuData.json'
import { Link, usePage } from '@inertiajs/react';
import NavLink from '@/Components/NavLink';

const Sidebar = () => {
    return (
        <aside id="layout-menu" className="layout-menu menu-vertical menu bg-menu-theme">
            <div className="app-brand demo">
                <Link aria-label='Navigate to sneat homepage' href="/" className="app-brand-link">
                    <span className="app-brand-logo demo">
                        <img src="/assets/img/sneat.svg" alt="sneat-logo" aria-label='Voyage logo image' />
                    </span>
                    <span className="app-brand-text demo menu-text fw-bold ms-2">Navil</span>
                </Link>

                <a href="#" className="layout-menu-toggle menu-link text-large ms-auto d-block d-xl-none">
                    <i className="bx bx-chevron-left bx-sm align-middle"></i>
                </a>
            </div>

            <div className="menu-inner-shadow"></div>

            <ul className="menu-inner py-1">
                {menuData.map((section) => (
                    <React.Fragment key={section.header}>
                        {section.header && (
                            <li className="menu-header small text-uppercase">
                                <span className="menu-header-text">{section.header}</span>
                            </li>
                        )}
                        {section.items.map((item, index) => (
                            <MenuItem key={index} {...item} />
                        ))}
                    </React.Fragment>
                ))}
            </ul>
        </aside>
    );
};

const MenuItem = (item) => {
    const { url } = usePage();
    const isActive = url === item.link;
    const hasSubmenu = item.submenu && item.submenu.length > 0;
    const isSubmenuActive = hasSubmenu && item.submenu.some(subitem => url === subitem.link);

    return (
        <li className={`menu-item ${isActive || isSubmenuActive ? 'active' : ''} ${hasSubmenu && isSubmenuActive ? 'open' : ''}`}>
            <NavLink
                aria-label={`Navigate to ${item.text} ${!item.available ? 'Pro' : ''}`}
                href={item.link}
                className={`menu-link ${item.submenu ? 'menu-toggle' : ''}`}
                target={item.link.includes('http') ? '_blank' : undefined}
            >
                <i className={`menu-icon tf-icons ${item.icon}`}></i>
                <div>{item.text}</div> 
                {item.available === false && (
                    <div className="badge bg-label-primary fs-tiny rounded-pill ms-auto">Pro</div>
                )}
            </NavLink>
            {item.submenu && (
                <ul className="menu-sub">
                    {item.submenu.map((subItem, index) => (
                        <MenuItem key={index} {...subItem} />
                    ))}
                </ul>
            )}
        </li>
    );
};

export default Sidebar;