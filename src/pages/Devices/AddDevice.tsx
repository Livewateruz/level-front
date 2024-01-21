import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import MaskedInput from 'react-text-mask';
import { IRootState } from '../../store';
import { RegionFace, UserFace } from '../../types';
import { api } from '../../utils/api';
import getData from '../../utils/getData';
import { toast } from '../../utils/toast';
import axios from 'axios';

const AddDevice = () => {
    const navigate = useNavigate();
    const [data, setData] = useState<{ serie: string }>({ serie: '' });
    const { token, user } = useSelector((state: IRootState) => state.data);

    const dispatch = useDispatch();
    const [regions, setRegions] = useState<{ data: RegionFace[] }>({ data: [] });
    const [isWorking, setWorking] = useState<boolean>(false);
    const [users, setUsers] = useState<{ data: UserFace[] }>({ data: [] });
    const [loading, setLoading] = useState<boolean>(false);
    const [file, setFile] = useState<File | null>(null);
    useEffect(() => {
        // Replace 'wss://your-websocket-server.com' with your WebSocket server URL
        const socket = new WebSocket('ws://livewater.uz:1880/modem');

        // Connection opened
        socket.addEventListener('open', event => {});

        // Listen for messages
        socket.addEventListener('message', event => {
            setWorking(true);
            toast.fire({
                icon: 'success',
                title: 'Qurilma ishlayapti',
                padding: '10px 20px'
            });
            // Handle the received message as needed
        });

        // Connection closed
        socket.addEventListener('close', event => {});

        // Clean up the WebSocket connection when the component unmounts
        return () => {
            socket.close();
        };
    }, []);
    useEffect(() => {
        getData({ url: 'regions', setData: setRegions, token });
        getData({ url: 'users', setData: setUsers, token });
    }, []);

    const handleChange = (e: any) => {
        setData(prevData => ({
            ...prevData,
            [e.target.name]: e.target.value
        }));
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        api.post('devices', { ...data, file }, { headers: { authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' } })
            .then(res => {
                toast.fire({ icon: 'success', padding: '10px 20px', title: "Qo'shildi!" });
            })
            .catch(err => {
                toast.fire({ icon: 'error', padding: '10px 20px', title: err.message });
            });
    };

    const check = () => {
        data.serie &&
            axios(`http://livewater.uz:1880/test?serie=${data?.serie}`).then(res => {
                toast.fire({
                    icon: 'success',
                    iconColor: 'yellow',
                    title: `${res.data} ushbu seriyali qurilmaga jo'natildi`,
                    padding: '10px 20px'
                });

            });
            setTimeout(() => {
                isWorking &&
                    toast.fire({
                        icon: 'error',
                        title: 'Ishlamayapti!',
                        padding: '10px 20px'
                    });
            }, 5000);
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
                <form onSubmit={e => handleSubmit(e)} className=' flex justify-between gap-32 px-10  w-full '>
                    <div className='mb-6  w-1/2'>
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
                                    <option disabled selected value=''>
                                        Hududni tanlang
                                    </option>
                                    {regions.data.map((r, i) => (
                                        <option value={r._id}>{r.name}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className='mb-6  w-1/2'>
                        <label className='block mb-2 text-sm font-medium text-gray-900 dark:text-white' htmlFor='multiple_files'>
                            Passport seriyasini yuklash
                        </label>
                        <input
                            required
                            onChange={e => {
                                const selectedFile = e.target?.files?.[0];
                                if (selectedFile) {
                                    setFile(selectedFile);
                                }
                            }}
                            className='block w-full form-input '
                            id='multiple_files'
                            accept='.xlsx'
                            type='file'
                        />

                        <div className='flex items-center mt-4'>
                            <label htmlFor='invoiceLabel' className='flex-1 ltr:mr-2 rtl:ml-2 mb-0'>
                                Foydalanuvchi
                            </label>
                            <div className=' font-semibold text-lg bg-black dark:bg-black-dark-light'>
                                <select required className='form-input lg:w-[270px] w-2/4' onChange={e => handleChange(e)} name='owner' id='owner'>
                                    <option disabled selected value=''>
                                        Foydalanuvchini tanlang
                                    </option>
                                    {users.data.map((r, i) => (
                                        <option value={r._id}>{r.first_name + ' ' + r.last_name}</option>
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
                        <button onClick={check} type='button' className='btn   btn-outline-primary  absolute  right-36 mt-4'>
                            Tekshirish
                        </button>

                        <button type='submit' className='btn   btn-outline-primary  absolute  right-12 mt-4'>
                            Saqlash
                        </button>
                    </div>
                </form>
            </div>
            <div className='full mt-5 '>
                {/* <YMaps>
            <Map
              width={"100%"}
              defaultState={{
                center: [device!.lat, device!.lng],
                zoom: 12,
              }}
            >
              <ZoomControl />
              <FullscreenControl />
              <GeolocationControl options={{ float: "left" }} />
              <Placemark geometry={[device!.lat, device!.lng]} />
            </Map>
          </YMaps> */}
            </div>
        </div>
    );
};
export default AddDevice;
