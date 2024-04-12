import '../assets/styles/Sidebar.css'
import Logo from '../assets/images/logo.png'
import {NavLink, Outlet} from "react-router-dom"
import {ReactComponent as Icon1} from '../assets/images/layer1.svg'
import {ReactComponent as Icon2} from '../assets/images/layer2.svg'
import {ReactComponent as Icon3} from '../assets/images/layer3.svg'
import LogoCompany from '../assets/images/logo__company.png'

const SideBar = () => {
    return (
        <div className='section'>
        <div className="sidebar">
            <div className='sidebar__logo'>
                <img src={Logo} alt=""/>
                <nav className='sidebar__nav'>
                    <ul>
                        <li>
                            <NavLink to="/"
								className={({ isActive }) =>
									`navigation__link ${
										isActive
											? "navigation__link--active"
											: ""
									}`
								}>
                                <Icon1 className='link__icon'/>
                                Калькулятор
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/information"
								className={({ isActive }) =>
									`navigation__link ${
										isActive
											? "navigation__link--active"
											: ""
									}`
								}>
                                <Icon2 className='link__icon'/>
                                Информация
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/statistic"
								className={({ isActive }) =>
									`navigation__link ${
										isActive
											? "navigation__link--active"
											: ""
									}`
								}>
                                <Icon3 className='link__icon'/>
                                Статистика
                            </NavLink>
                        </li>
                    </ul>
                </nav>
                <div className='sidebar__footer'>
                    <div className='logo'><img src={LogoCompany} alt=""/></div>
                    
                    WagonWellness v1.0
               </div>
            </div>
        </div>
        <main className="app__content">
			<Outlet />
		</main>
        </div>
    );
};

export default SideBar;