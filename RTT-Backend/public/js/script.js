
const socket = io();
const markers={};


socket.on("connect", () => {
    console.log("Connected to server");



if(navigator.geolocation)
{
    navigator.geolocation.watchPosition((position)=>{
        const {latitude,longitude}=position.coords;
        console.log(`Emitting location: ${latitude}, ${longitude}`);
        //send location is basically an event that we are emitting from the frontend
        socket.emit("send-location", {latitude,longitude});


    }, (error)=>{
        console.log(error);
    },
{
    enableHighAccuracy:true,
    timeout: 10000,//after every 10s it will as to check the location again
    maximumAge: 0   //caching humne off kardi(koi bhi data save ni hoga)
});
}
});

const map= L.map("map").setView([0,0],10);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{
    attribution:"Coding School"
}).addTo(map);



socket.on("receive-location",(data)=>{
    const{id,latitude,longitude}=data;
    console.log("Location received from:", socket.id, data);
    map.setView([latitude, longitude],18);



if(markers[id])
{
    markers[id].setLatLng([latitude,longitude]);
}
else{
    markers[id]=L.marker([latitude,longitude]).addTo(map);
}
});


socket.on("user-disconnected",(id)=>{
    if(markers[id])
    {
        map.removeLayer(markers[id]);
        delete markers[id];
    }

})






