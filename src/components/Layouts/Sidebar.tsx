import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useLocation } from 'react-router-dom';
import { Logo } from '../../../public/assets/svgs';
import { IRootState } from '../../store';
import { toggleSidebar } from '../../store/themeConfigSlice';

const Sidebar = () => {
    const [currentMenu, setCurrentMenu] = useState<string>('');
    const themeConfig = useSelector((state: IRootState) => state.themeConfig);
    const semidark = useSelector((state: IRootState) => state.themeConfig.semidark);
    const role = useSelector((state: IRootState) => state.data.role);
    const location = useLocation();
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const toggleMenu = (value: string) => {
        setCurrentMenu(oldValue => {
            if (value === 'dashboard') {
                return '/';
            }
            return value;
        });
    };
    useEffect(() => {
        if (window.innerWidth < 1024 && themeConfig.sidebar) {
            dispatch(toggleSidebar());
        }
    }, [location]);
    return (
        <div className={semidark ? 'dark' : ''}>
            <nav
                className={`sidebar fixed min-h-screen h-full top-0 bottom-0 w-[260px] shadow-[5px_0_25px_0_rgba(94,92,154,0.1)] z-50 transition-all duration-300 ${semidark ? 'text-white-dark' : ''}`}
            >
                <div className='bg-white dark:bg-black h-full'>
                    <div className='flex justify-between items-center px-4 py-3'>
                        <NavLink to='/' className='main-logo flex items-center shrink-0'>
                            <Logo />
                            <span className='text-2xl ltr:ml-1.5 rtl:mr-1.5 font-semibold align-middle lg:inline dark:text-white-light'>{t('Live Water')}</span>
                        </NavLink>

                        <button
                            type='button'
                            className='collapse-icon w-8 h-8 rounded-full flex items-center hover:bg-gray-500/10 dark:hover:bg-dark-light/10 dark:text-white-light transition duration-300 rtl:rotate-180'
                            onClick={() => dispatch(toggleSidebar())}
                        >
                            <svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg' className='w-5 h-5 m-auto'>
                                <path d='M13 19L7 12L13 5' stroke='currentColor' strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round' />
                                <path opacity='0.5' d='M16.9998 19L10.9998 12L16.9998 5' stroke='currentColor' strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round' />
                            </svg>
                        </button>
                    </div>
                    <PerfectScrollbar className='h-[calc(100vh-80px)] relative'>
                        {role === 'admin' && (
                            <ul className='relative font-semibold space-y-0.5 p-4 py-0'>
                                <li className='nav-item'>
                                    <NavLink to={'/'} type='button' className={`${currentMenu === 'dashboard' ? 'active' : ''} nav-link group w-full`} onClick={() => toggleMenu('dashboard')}>
                                        <div className='flex items-center'>
                                            <svg className='group-hover:!text-primary' width='20' height='20' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
                                                <path
                                                    opacity='0.5'
                                                    d='M2 12.2039C2 9.91549 2 8.77128 2.5192 7.82274C3.0384 6.87421 3.98695 6.28551 5.88403 5.10813L7.88403 3.86687C9.88939 2.62229 10.8921 2 12 2C13.1079 2 14.1106 2.62229 16.116 3.86687L18.116 5.10812C20.0131 6.28551 20.9616 6.87421 21.4808 7.82274C22 8.77128 22 9.91549 22 12.2039V13.725C22 17.6258 22 19.5763 20.8284 20.7881C19.6569 22 17.7712 22 14 22H10C6.22876 22 4.34315 22 3.17157 20.7881C2 19.5763 2 17.6258 2 13.725V12.2039Z'
                                                    fill='currentColor'
                                                />
                                                <path
                                                    d='M9 17.25C8.58579 17.25 8.25 17.5858 8.25 18C8.25 18.4142 8.58579 18.75 9 18.75H15C15.4142 18.75 15.75 18.4142 15.75 18C15.75 17.5858 15.4142 17.25 15 17.25H9Z'
                                                    fill='currentColor'
                                                />
                                            </svg>
                                            <span className='ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark'>{t('Asosiy sahifa')}</span>
                                        </div>
                                    </NavLink>
                                </li>
                                <li className='nav-item'>
                                    <NavLink to={'/users'} type='button' className={`${currentMenu === 'dashboard' ? 'active' : ''} nav-link group w-full`} onClick={() => toggleMenu('dashboard')}>
                                        <div className='flex items-center'>
                                            <svg width='18' height='18' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg' className='w-6 h-6 group-hover:!text-primary'>
                                                <circle cx='12' cy='6' r='4' stroke='currentColor' strokeWidth='1.5'></circle>
                                                <path
                                                    opacity='0.5'
                                                    d='M20 17.5C20 19.9853 20 22 12 22C4 22 4 19.9853 4 17.5C4 15.0147 7.58172 13 12 13C16.4183 13 20 15.0147 20 17.5Z'
                                                    stroke='currentColor'
                                                    strokeWidth='1.5'
                                                ></path>
                                            </svg>
                                            <span className='ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark'>{t('Foydalanuvchilar')}</span>
                                        </div>
                                    </NavLink>
                                </li>

                                <li className='nav-item'>
                                    <NavLink to='/events' className='group'>
                                        <div className='flex items-center'>
                                            <svg className='group-hover:!text-primary' width='29' height='29' viewBox='0 0 29 29' fill='none' xmlns='http://www.w3.org/2000/svg'>
                                                <path
                                                    className='group-hover:!text-primary text-red-700'
                                                    d='M16.5 3.5L16.5 12.5L25.5 12.5C25.5 7.529 21.471 3.5 16.5 3.5Z'
                                                    stroke='#565E6C'
                                                    strokeWidth='2.4'
                                                    strokeMiterlimit='10'
                                                    strokeLinecap='square'
                                                />
                                                <path
                                                    d='M12.5 7.5C7.529 7.5 3.5 11.529 3.5 16.5C3.5 21.471 7.529 25.5 12.5 25.5C17.471 25.5 21.5 21.471 21.5 16.5L12.5 16.5L12.5 7.5Z'
                                                    stroke='#565E6C'
                                                    strokeWidth='2.4'
                                                    strokeMiterlimit='10'
                                                    strokeLinecap='square'
                                                />
                                            </svg>

                                            <span className='ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark'>{t("Serverga yo'naltirilgan m...")}</span>
                                        </div>
                                    </NavLink>
                                </li>

                                <li className='nav-item'>
                                    <NavLink to='/constructor' className='group'>
                                        <div className='flex items-center'>
                                            <svg width='23' height='25' viewBox='0 0 23 25' fill='none' xmlns='http://www.w3.org/2000/svg' className='group-hover:!text-primary'>
                                                <path
                                                    d='M21.5 4.5L13.5 12.5L13.5 20.5L9.5 22.5L9.5 12.5L1.5 4.5L1.5 1.5L21.5 1.5V4.5Z'
                                                    stroke='#565E6C'
                                                    strokeWidth='2.4'
                                                    strokeMiterlimit='10'
                                                    strokeLinecap='square'
                                                />
                                            </svg>

                                            <span className='ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark'>{t('cnst')}</span>
                                        </div>
                                    </NavLink>
                                </li>
                                <li className='nav-item'>
                                    <NavLink to='/device/map' className='group'>
                                        <div className='flex items-center'>
                                            <svg width='20' height='20' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg' className='w-6 h-6 group-hover:!text-primary'>
                                                <path
                                                    opacity='0.5'
                                                    d='M4 10.1433C4 5.64588 7.58172 2 12 2C16.4183 2 20 5.64588 20 10.1433C20 14.6055 17.4467 19.8124 13.4629 21.6744C12.5343 22.1085 11.4657 22.1085 10.5371 21.6744C6.55332 19.8124 4 14.6055 4 10.1433Z'
                                                    stroke='currentColor'
                                                    strokeWidth='1.5'
                                                ></path>
                                                <circle cx='12' cy='10' r='3' stroke='currentColor' strokeWidth='1.5'></circle>
                                            </svg>
                                            <span className='ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark'>{t('Qurilmalar xaritada')}</span>
                                        </div>
                                    </NavLink>
                                </li>
                                <li className='nav-item'>
                                    <NavLink to='/regions' className='group'>
                                        <div className='flex items-center'>
                                            <svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg' className='w-6 h-6 group-hover:!text-primary'>
                                                <circle opacity='0.5' cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='1.5'></circle>
                                                <path
                                                    d='M13.024 14.5601C10.7142 15.484 9.5593 15.946 8.89964 15.4977C8.74324 15.3914 8.60834 15.2565 8.50206 15.1001C8.0538 14.4405 8.51575 13.2856 9.43967 10.9758C9.63673 10.4831 9.73527 10.2368 9.90474 10.0435C9.94792 9.99429 9.99429 9.94792 10.0435 9.90474C10.2368 9.73527 10.4831 9.63673 10.9758 9.43966C13.2856 8.51575 14.4405 8.0538 15.1001 8.50206C15.2565 8.60834 15.3914 8.74324 15.4977 8.89964C15.946 9.5593 15.484 10.7142 14.5601 13.024C14.363 13.5166 14.2645 13.763 14.095 13.9562C14.0518 14.0055 14.0055 14.0518 13.9562 14.095C13.763 14.2645 13.5166 14.363 13.024 14.5601Z'
                                                    stroke='currentColor'
                                                    strokeWidth='1.5'
                                                ></path>
                                            </svg>
                                            <span className='ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark'>{t('Hududlar')}</span>
                                        </div>
                                    </NavLink>
                                </li>
                                <li className='nav-item'>
                                    <NavLink to='/devices' className='group'>
                                        <div className='flex items-center'>
                                            <svg width='29' height='29' viewBox='0 0 29 29' fill='none' xmlns='http://www.w3.org/2000/svg'>
                                                <path
                                                    d='M7.79 12.4998C7.4796 11.4553 7.41735 10.3527 7.60821 9.2798C7.79907 8.20694 8.23778 7.19345 8.8894 6.32004C9.54101 5.44662 10.3875 4.7374 11.3616 4.24883C12.3356 3.76027 13.4103 3.50586 14.5 3.50586C15.5897 3.50586 16.6644 3.76027 17.6384 4.24883C18.6125 4.7374 19.459 5.44662 20.1106 6.32004C20.7622 7.19345 21.2009 8.20694 21.3918 9.2798C21.5827 10.3527 21.5204 11.4553 21.21 12.4998'
                                                    stroke='#565E6C'
                                                    strokeWidth='2.4'
                                                    strokeMiterlimit='10'
                                                    strokeLinecap='square'
                                                />
                                                <path
                                                    d='M14.5 13.5C16.1569 13.5 17.5 12.1569 17.5 10.5C17.5 8.84315 16.1569 7.5 14.5 7.5C12.8431 7.5 11.5 8.84315 11.5 10.5C11.5 12.1569 12.8431 13.5 14.5 13.5Z'
                                                    stroke='#565E6C'
                                                    strokeWidth='2.4'
                                                    strokeMiterlimit='10'
                                                    strokeLinecap='square'
                                                />
                                                <path
                                                    d='M14.5 25.5C15.6046 25.5 16.5 24.6046 16.5 23.5C16.5 22.3954 15.6046 21.5 14.5 21.5C13.3954 21.5 12.5 22.3954 12.5 23.5C12.5 24.6046 13.3954 25.5 14.5 25.5Z'
                                                    stroke='#565E6C'
                                                    strokeWidth='2.4'
                                                    strokeMiterlimit='10'
                                                    strokeLinecap='square'
                                                />
                                                <path
                                                    d='M6.5 25.5C7.60457 25.5 8.5 24.6046 8.5 23.5C8.5 22.3954 7.60457 21.5 6.5 21.5C5.39543 21.5 4.5 22.3954 4.5 23.5C4.5 24.6046 5.39543 25.5 6.5 25.5Z'
                                                    stroke='#565E6C'
                                                    strokeWidth='2.4'
                                                    strokeMiterlimit='10'
                                                    strokeLinecap='square'
                                                />
                                                <path
                                                    d='M22.5 25.5C23.6046 25.5 24.5 24.6046 24.5 23.5C24.5 22.3954 23.6046 21.5 22.5 21.5C21.3954 21.5 20.5 22.3954 20.5 23.5C20.5 24.6046 21.3954 25.5 22.5 25.5Z'
                                                    stroke='#565E6C'
                                                    strokeWidth='2.4'
                                                    strokeMiterlimit='10'
                                                    strokeLinecap='square'
                                                />
                                                <path d='M14.5 21.5L14.5 17.5' stroke='#565E6C' strokeWidth='2.4' strokeMiterlimit='10' strokeLinecap='square' />
                                                <path d='M6.5 21.5V18.5L9.5 16.5' stroke='#565E6C' strokeWidth='2.4' strokeMiterlimit='10' strokeLinecap='square' />
                                                <path d='M22.5 21.5V18.5L19.5 16.5' stroke='#565E6C' strokeWidth='2.4' strokeMiterlimit='10' strokeLinecap='square' />
                                            </svg>

                                            <span className='ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark'>{t('Qurilmalar')}</span>
                                        </div>
                                    </NavLink>
                                </li>
                                <li className='nav-item'>
                                    <NavLink to='/sms' className='group'>
                                        <div className='flex items-center'>
                                            <svg width='20' height='20' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg' className='w-6 h-6'>
                                                <path
                                                    d='M3.74157 18.5545C4.94119 20 7.17389 20 11.6393 20H12.3605C16.8259 20 19.0586 20 20.2582 18.5545M3.74157 18.5545C2.54194 17.1091 2.9534 14.9146 3.77633 10.5257C4.36155 7.40452 4.65416 5.84393 5.76506 4.92196M3.74157 18.5545C3.74156 18.5545 3.74157 18.5545 3.74157 18.5545ZM20.2582 18.5545C21.4578 17.1091 21.0464 14.9146 20.2235 10.5257C19.6382 7.40452 19.3456 5.84393 18.2347 4.92196M20.2582 18.5545C20.2582 18.5545 20.2582 18.5545 20.2582 18.5545ZM18.2347 4.92196C17.1238 4 15.5361 4 12.3605 4H11.6393C8.46374 4 6.87596 4 5.76506 4.92196M18.2347 4.92196C18.2347 4.92196 18.2347 4.92196 18.2347 4.92196ZM5.76506 4.92196C5.76506 4.92196 5.76506 4.92196 5.76506 4.92196Z'
                                                    stroke='currentColor'
                                                    stroke-width='1.5'
                                                ></path>
                                                <path
                                                    opacity='0.5'
                                                    d='M9.1709 8C9.58273 9.16519 10.694 10 12.0002 10C13.3064 10 14.4177 9.16519 14.8295 8'
                                                    stroke='currentColor'
                                                    stroke-width='1.5'
                                                    stroke-linecap='round'
                                                ></path>
                                            </svg>

                                            <span className='ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark'>{t('Sms')}</span>
                                        </div>
                                    </NavLink>
                                </li>
                            </ul>
                        )}
                        {role === 'operator' && (
                            <ul className='relative font-semibold space-y-0.5 p-4 py-0'>
                                <li className='nav-item'>
                                    <NavLink to={'/'} type='button' className={`${currentMenu === 'dashboard' ? 'active' : ''} nav-link group w-full`} onClick={() => toggleMenu('dashboard')}>
                                        <div className='flex items-center'>
                                            <svg className='group-hover:!text-primary' width='20' height='20' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
                                                <path
                                                    opacity='0.5'
                                                    d='M2 12.2039C2 9.91549 2 8.77128 2.5192 7.82274C3.0384 6.87421 3.98695 6.28551 5.88403 5.10813L7.88403 3.86687C9.88939 2.62229 10.8921 2 12 2C13.1079 2 14.1106 2.62229 16.116 3.86687L18.116 5.10812C20.0131 6.28551 20.9616 6.87421 21.4808 7.82274C22 8.77128 22 9.91549 22 12.2039V13.725C22 17.6258 22 19.5763 20.8284 20.7881C19.6569 22 17.7712 22 14 22H10C6.22876 22 4.34315 22 3.17157 20.7881C2 19.5763 2 17.6258 2 13.725V12.2039Z'
                                                    fill='currentColor'
                                                />
                                                <path
                                                    d='M9 17.25C8.58579 17.25 8.25 17.5858 8.25 18C8.25 18.4142 8.58579 18.75 9 18.75H15C15.4142 18.75 15.75 18.4142 15.75 18C15.75 17.5858 15.4142 17.25 15 17.25H9Z'
                                                    fill='currentColor'
                                                />
                                            </svg>
                                            <span className='ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark'>{t('Asosiy sahifa')}</span>
                                        </div>
                                    </NavLink>
                                </li>
                                <li className='nav-item'>
                                    <NavLink to='/constructor' className='group'>
                                        <div className='flex items-center'>
                                            <svg width='23' height='25' viewBox='0 0 23 25' fill='none' xmlns='http://www.w3.org/2000/svg' className='group-hover:!text-primary'>
                                                <path
                                                    d='M21.5 4.5L13.5 12.5L13.5 20.5L9.5 22.5L9.5 12.5L1.5 4.5L1.5 1.5L21.5 1.5V4.5Z'
                                                    stroke='#565E6C'
                                                    strokeWidth='2.4'
                                                    strokeMiterlimit='10'
                                                    strokeLinecap='square'
                                                />
                                            </svg>

                                            <span className='ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark'>{t('cnst')}</span>
                                        </div>
                                    </NavLink>
                                </li>
                                <li className='nav-item'>
                                    <NavLink to='/devices' className='group'>
                                        <div className='flex items-center'>
                                            <svg width='29' height='29' viewBox='0 0 29 29' fill='none' xmlns='http://www.w3.org/2000/svg'>
                                                <path
                                                    d='M7.79 12.4998C7.4796 11.4553 7.41735 10.3527 7.60821 9.2798C7.79907 8.20694 8.23778 7.19345 8.8894 6.32004C9.54101 5.44662 10.3875 4.7374 11.3616 4.24883C12.3356 3.76027 13.4103 3.50586 14.5 3.50586C15.5897 3.50586 16.6644 3.76027 17.6384 4.24883C18.6125 4.7374 19.459 5.44662 20.1106 6.32004C20.7622 7.19345 21.2009 8.20694 21.3918 9.2798C21.5827 10.3527 21.5204 11.4553 21.21 12.4998'
                                                    stroke='#565E6C'
                                                    strokeWidth='2.4'
                                                    strokeMiterlimit='10'
                                                    strokeLinecap='square'
                                                />
                                                <path
                                                    d='M14.5 13.5C16.1569 13.5 17.5 12.1569 17.5 10.5C17.5 8.84315 16.1569 7.5 14.5 7.5C12.8431 7.5 11.5 8.84315 11.5 10.5C11.5 12.1569 12.8431 13.5 14.5 13.5Z'
                                                    stroke='#565E6C'
                                                    strokeWidth='2.4'
                                                    strokeMiterlimit='10'
                                                    strokeLinecap='square'
                                                />
                                                <path
                                                    d='M14.5 25.5C15.6046 25.5 16.5 24.6046 16.5 23.5C16.5 22.3954 15.6046 21.5 14.5 21.5C13.3954 21.5 12.5 22.3954 12.5 23.5C12.5 24.6046 13.3954 25.5 14.5 25.5Z'
                                                    stroke='#565E6C'
                                                    strokeWidth='2.4'
                                                    strokeMiterlimit='10'
                                                    strokeLinecap='square'
                                                />
                                                <path
                                                    d='M6.5 25.5C7.60457 25.5 8.5 24.6046 8.5 23.5C8.5 22.3954 7.60457 21.5 6.5 21.5C5.39543 21.5 4.5 22.3954 4.5 23.5C4.5 24.6046 5.39543 25.5 6.5 25.5Z'
                                                    stroke='#565E6C'
                                                    strokeWidth='2.4'
                                                    strokeMiterlimit='10'
                                                    strokeLinecap='square'
                                                />
                                                <path
                                                    d='M22.5 25.5C23.6046 25.5 24.5 24.6046 24.5 23.5C24.5 22.3954 23.6046 21.5 22.5 21.5C21.3954 21.5 20.5 22.3954 20.5 23.5C20.5 24.6046 21.3954 25.5 22.5 25.5Z'
                                                    stroke='#565E6C'
                                                    strokeWidth='2.4'
                                                    strokeMiterlimit='10'
                                                    strokeLinecap='square'
                                                />
                                                <path d='M14.5 21.5L14.5 17.5' stroke='#565E6C' strokeWidth='2.4' strokeMiterlimit='10' strokeLinecap='square' />
                                                <path d='M6.5 21.5V18.5L9.5 16.5' stroke='#565E6C' strokeWidth='2.4' strokeMiterlimit='10' strokeLinecap='square' />
                                                <path d='M22.5 21.5V18.5L19.5 16.5' stroke='#565E6C' strokeWidth='2.4' strokeMiterlimit='10' strokeLinecap='square' />
                                            </svg>

                                            <span className='ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark'>{t('Qurilmalar')}</span>
                                        </div>
                                    </NavLink>
                                </li>
                                <li className='nav-item'>
                                    <NavLink to='/device/map' className='group'>
                                        <div className='flex items-center'>
                                            <svg width='20' height='20' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg' className='w-6 h-6 group-hover:!text-primary'>
                                                <path
                                                    opacity='0.5'
                                                    d='M4 10.1433C4 5.64588 7.58172 2 12 2C16.4183 2 20 5.64588 20 10.1433C20 14.6055 17.4467 19.8124 13.4629 21.6744C12.5343 22.1085 11.4657 22.1085 10.5371 21.6744C6.55332 19.8124 4 14.6055 4 10.1433Z'
                                                    stroke='currentColor'
                                                    strokeWidth='1.5'
                                                ></path>
                                                <circle cx='12' cy='10' r='3' stroke='currentColor' strokeWidth='1.5'></circle>
                                            </svg>
                                            <span className='ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark'>{t('Qurilmalar xaritada')}</span>
                                        </div>
                                    </NavLink>
                                </li>
                            </ul>
                        )}
                    </PerfectScrollbar>
                </div>
            </nav>
        </div>
    );
};

export default Sidebar;
