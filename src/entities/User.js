class User{
    id;
    first_name;
    last_name;
    username;
    password;
}

constructor(id, first_name, last_name, username, password)
{
    this.id = id;
    this.first_name = first_name;
    this.last_name=last_name;
    this.username=username;
    this.password=password;
}

constructor(first_name, last_name, username, password)
{
    this.first_name = first_name;
    this.last_name=last_name;
    this.username=username;
    this.password=password;
}

export default User;