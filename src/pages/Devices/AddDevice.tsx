import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { IRootState } from '../../store';
import { RegionFace, UserFace } from '../../types';
import { api } from '../../utils/api';
import getData from '../../utils/getData';
import { toast } from '../../utils/toast';
import { Miniloader } from '../Component/Miniloader';

const AddDevice = () => {
    const navigate = useNavigate();
    const [data, setData] = useState<{ serie: string }>({ serie: '' });
    const [regions, setRegions] = useState<{ data: RegionFace[] }>({ data: [] });
    const [users, setUsers] = useState<{ data: UserFace[] }>({ data: [] });
    const [loading, setLoading] = useState<"creating" | "checking" | "noaction">("noaction");
    const [file, setFile] = useState<File | null>(null);

    useEffect(() => {
        getData({ url: 'regions', setData: setRegions });
        getData({ url: 'users', setData: setUsers });
    }, []);

    const handleChange = (e: any) => {
        setData(prevData => ({
            ...prevData,
            [e.target.name]: e.target.value
        }));
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        Swal.fire({
            icon: 'warning',
            title: "Qurilma qo'shiladi?",
            text: "Qurilmani qo'shishga ishon komil qiling!",
            showCancelButton: true,
            confirmButtonText: 'Davom etish',
            cancelButtonText: 'Bekor qilish',
            padding: '2em',
            customClass: 'sweet-alerts'
        }).then(result => {
            if (result.isConfirmed) {
                setLoading("creating")
                api.post('devices', { ...data, file }, { headers: { 'Content-Type': 'multipart/form-data' } })
                    .then(_ => {
                        toast.fire({ icon: 'success', padding: '10px 20px', title: "Qo'shildi!" });
                        navigate(-1);
                    })
                    .catch(err => {
                        toast.fire({ icon: 'error', padding: '10px 20px', title: err.response?.data.msg || err.message });
                    }).finally(() => {
                        setLoading("noaction")
                    });
            }
        });
    };


    return (
        <div>
            <ul className='flex space-x-2 rtl:space-x-reverse'>
                <li>
                    <Link to='/' className='text-primary hover:underline'>
                        Asosiy sahifa
                    </Link>
                </li>
                <li>
                    <Link to='/devices' className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2 text-primary hover:underline">
                        Qurilmalar
                    </Link>
                </li>
                <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                    <span>Yangi qo'shish</span>
                </li>
            </ul>
            <div className='flex justify-between  flex-wrap w-full  mt-5'>
                <form onSubmit={e => handleSubmit(e)} className=' flex flex-col md:flex-row justify-between gap-32 px-2 md:px-10   w-full '>
                    <div className='mb-6  md:w-1/2 w-full'>
                        <div className='flex items-center mt-4'>
                            <label htmlFor='name' className='flex-1 ltr:mr-2 rtl:ml-2 mb-'>
                                Obyekt nomi
                            </label>
                            <input required onChange={e => handleChange(e)} id='name' type='text' name='name' className='form-input lg:w-[270px] w-2/3' placeholder='123' />
                        </div>
                        <div className='flex items-center mt-4'>
                            <label htmlFor='number' className='flex-1 ltr:mr-2 rtl:ml-2 mb-'>
                                Qurilma seriyasi
                            </label>
                            <input required onChange={e => handleChange(e)} id='number' type='text' name='serie' className='form-input lg:w-[270px] w-2/3' placeholder='864333048092134' />
                        </div>


                        <div className='flex items-center mt-4'>
                            <label htmlFor='private_key' className='flex-1 ltr:mr-2 rtl:ml-2 mb-0'>
                                Qurilma maxfiy kodi
                            </label>
                            <input required onChange={e => handleChange(e)} id='private_key' type='text' name='device_privet_key' className='form-input lg:w-[270px] w-2/3' placeholder='eih5wfwio' />
                        </div>
                        <div className='flex items-center mt-4'>
                            <label htmlFor='invoiceLabel' className='flex-1 ltr:mr-2 rtl:ml-2 mb-0'>
                                Qurilma joylashuvi
                            </label>
                            <div className=' font-semibold text-lg bg-black dark:bg-black-dark-light'>
                                <select required className='form-input lg:w-[270px] w-2/4' onChange={e => handleChange(e)} name='region' id='region'>
                                    <option selected value={''}>
                                        Hududni tanlang
                                    </option>
                                    {regions.data.map((r, i) => (
                                        <option key={i} value={r._id}>
                                            {r?.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className='flex items-center mt-4'>
                            <label htmlFor='height' className='flex-1 ltr:mr-2 rtl:ml-2 mb-0'>
                                Qurilma joylashgan balandligi
                            </label>
                            <input onChange={e => handleChange(e)} id='height' type='text' name='height' className='form-input lg:w-[270px] w-2/3' placeholder='1870' />
                        </div>
                    </div>

                    <div className='mb-6  md:w-1/2 w-full'>
                        <div className='flex items-center mt-4'>
                            <label htmlFor='number' className='flex-1 ltr:mr-2 rtl:ml-2 mb-'>
                                Qurilma pudratchisi
                            </label>
                            <input required onChange={e => handleChange(e)} id='contractor' type='text' name='contractor' className='form-input lg:w-[270px] w-2/3' placeholder='Bobur Akramov' />
                        </div>
                        <div className='flex items-center '>
                            <label htmlFor='number' className='flex-1 ltr:mr-2 rtl:ml-2 mt-4'>
                                Qurilma passporti
                            </label>
                            <input
                                required
                                onChange={e => {
                                    const selectedFile = e.target?.files?.[0];
                                    if (selectedFile) {
                                        setFile(selectedFile);
                                    }
                                }}
                                className='form-input lg:w-[270px] w-2/3 mt-4 '
                                id='multiple_files'
                                accept='.xlsx'
                                type='file'
                            />                        </div>


                        <div className='flex items-center mt-4'>
                            <label htmlFor='invoiceLabel' className='flex-1 ltr:mr-2 rtl:ml-2 mb-0'>
                                Foydalanuvchi
                            </label>
                            <div className=' font-semibold text-lg bg-black dark:bg-black-dark-light'>
                                <select required className='form-input lg:w-[270px] w-2/4' onChange={e => handleChange(e)} name='owner' id='owner'>
                                    <option key={'rtyui'} disabled selected defaultValue=''>
                                        Foydalanuvchini tanlang
                                    </option>
                                    {users.data.map((r, i) => (
                                        <option key={i} value={r._id}>
                                            {r?.first_name + ' ' + r?.last_name + ' ' + r?.role}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className='flex justify-between items-center mt-4 '>
                            <div className=''>Lat Long</div>
                            <div className='flex gap-2  lg:w-[147px] w-2/3'>
                                <input
                                    required
                                    onChange={e => handleChange(e)}
                                    id='number'
                                    step='any'
                                    type='number'
                                    name='lat'
                                    className='form-input focus:outline-none no-spinners  w-1/2'
                                    placeholder='Lat'
                                />
                                <input
                                    required
                                    onChange={e => handleChange(e)}
                                    id='number'
                                    step='any'
                                    type='number'
                                    name='long'
                                    className='form-input focus:outline-none no-spinners  w-1/2'
                                    placeholder='Long'
                                />
                            </div>
                        </div>
                        <div className='flex justify-between mt-10'>

                            <button type='submit' disabled={loading !== "noaction"} className='btn   btn-outline-primary  '>
                                Saqlash {loading === "creating" && <Miniloader />}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};
export default AddDevice;
