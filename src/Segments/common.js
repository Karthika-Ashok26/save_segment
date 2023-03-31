import axios from 'axios';
export const segments = [
    {label: "First Name", value: "first_name"}, 
    {label: "Last Name", value: "last_name"}, 
    {label: "Gender", value: "gender"}, 
    {label: "Age", value: "age"},
    {label: "Account Name", value: "account_name"}, 
    {label: "City", value: "city"}, 
    {label: "State", value: "state"}
];

export function saveSegment(payload){
return axios.post('https://webhook.site/cf1cf6aa-c8cb-4597-baf2-86736686d792', payload)
}