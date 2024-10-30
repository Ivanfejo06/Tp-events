class Event_tag{
    id;
    id_event;
    id_tag;
}

constructor(id, id_event, id_tag)
{
    this.id = id;
    this.id_event = id_event;
    this.id_tag = id_tag;
}

constructor(id_event, id_tag)
{
    this.id_event = id_event;
    this.id_tag = id_tag;
}

export default Event_tag;