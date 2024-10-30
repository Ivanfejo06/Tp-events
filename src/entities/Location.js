class Location{
    id;
    name;
    id_province;
    latitude;
    longitude;
}

constructor(id, name, id_province, latitude, longitude)
{
    this.id = id;
    this.name = name;
    this.id_province;
    this.latitude;
    this.longitude;
}

constructor(name, id_province, latitude, longitude)
{
    this.name = name;
    this.id_province;
    this.latitude;
    this.longitude;
}

export default Location;