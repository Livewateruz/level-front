export interface DevicesFace {
    _id: string;
    region: RegionFace;
    lat: number;
    long: number;
    serie: string;
    name: string;
    height: number;
    device_privet_key: string;
    contractor: string;
    date: number;
    owner: UserFace;
    isWorking: boolean;
    created_at: string;
    updated_at: string;
}
export interface ResponseData<T> {
    total: number;
    offset: number;
    limit: number;
    data: T[];
}
export interface DevicesFaceOpt {
    _id?: string;
    region?: string;
    contractor?: string;
    lat?: number;
    long?: number;
    height?: number;
    serie?: string;
    name?: string;
    device_privet_key?: string;
    date?: number;
    owner?: string;
    created_at?: string;
    updated_at?: string;
}

export interface UserFace {
    _id: string;
    first_name: string;
    last_name: string;
    username: string;
    mobil_phone: string;
    role: string;
    region: string;
    devices: DevicesFace[];
    created_at: string;
    updated_at: string;
}
export interface UserFaceOpt {
    _id?: string;
    first_name?: string;
    last_name?: string;
    username?: string;
    mobil_phone?: string;
    role?: string;
    region?: string;
    created_at?: string;
    updated_at?: string;
}
export interface RegionFace {
    _id: string;
    name: string;
    devicesCount: number;
}
export interface EventFace {
    [key: string]: string | number | boolean;
    _id: string;
    level: number;
    volume: number;
    signal: 'good' | 'nosignal';
    date_in_ms: number;
    device: DevicesFace;
}
export interface EventFaceHandelExel {
    [key: string]: string | number | boolean;
    _id: string;
    level: number;
    volume: number;
    signal: 'good' | 'nosignal';
    date_in_ms: number;
    serie: string;
    name: string;
}
export interface ServerdataFace {
    [key: string]: string | number | boolean;
    _id: string;
    device_privet_key: string;
    basedata: string;
    message: string;
    send_data_in_ms: number;
    status_code: number;
    created_at: string;
    updated_at: string;
}

export interface Delivered {
    month: string;
    packets: number;
    sent_packets: number;
    status: string;
}
