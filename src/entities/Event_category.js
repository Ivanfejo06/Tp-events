class Event_category{
    id;
    name;
    display_order;
}

constructor(id, name, display_order)
{
    this.id = id;
    this.name = name;
    this.display_order = display_order;
}

constructor(name,  display_order)
{
    this.name = name;
    this.display_order = display_order;
}

export default Event_category;