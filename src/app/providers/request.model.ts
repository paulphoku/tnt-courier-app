export interface RequestModel {
    selectedInput: string;

    destination_addr: string;
    destination_lat: number;
    destination_lng: number;

    collection_addr: string;
    collection_lat: number;
    collection_lng: number;

    reciever_name: string;
    reciever_number: string;
    request_status: string;
    request_notes: string;

    schedule_time:string

    photo_url: string;
    datecreated: string;
    price: number;

    polyline: string;
    request_id:string;



}


