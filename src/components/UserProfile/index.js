import React, { Component } from 'react'
import {Card, CardHeader, CardTitle} from 'material-ui/Card'

import './UserProfile.css'

class UserProfile extends Component {
  constructor(props){
    super(props);
    this.state = {
      people: [],
    }
  }
  
  componentDidMount(){
    let number = this.props.number
    fetch(`https://randomuser.me/api/?results=${number}`)
    .then(results => {
      return results.json();
    }).then(data => {
      let names = data.results.map((person) => {
        let userpic = person.picture.large;
        let title = person.name.title;
        let firstname = person.name.first;
        let lastname = person.name.last;
        let fullname = `${title} ${firstname} ${lastname}`;
        let country = person.location.city;
        let state = person.location.state;
        let city = person.location.city;
        let street_number = person.location.street.number;
        let street_name = person.location.street.name;
        let street = `${street_number} ${street_name}`
        let birthday = person.dob.date;
        let age = person.dob.age;
        let email = person.email;
        let phone = person.phone;
        this.setState((prevState)=> ({
          people: [
            ...prevState.people,
            {
              name: fullname,
              picsrc: userpic,
              country,
              state,
              city,
              street,
              birthday,
              age,
              email,
              phone
            }
          ]
        }))

      })

    })

  }
  render(){
    return (
      <div id="card-holder">
    {this.state.people.map((obj,idx) => {
      return(
              <Card className="cards" key={idx}>
              <CardHeader title={obj.name} avatar={obj.picsrc} />
              <CardTitle title={obj.city} subtitle={obj.email}/>
              <div>
                <h4>Адрес</h4>
                <ul>
                  <li>{obj.country}</li>
                  <li>{obj.state}</li>
                  <li>{obj.street}</li>
                </ul>
                <p>Дата рождения - {obj.birthday}</p>
                <p>Возраст - {obj.age}</p>
                <p>Почта - {obj.email}</p>
                <p> Номер - {obj.phone}</p>
              </div>
              </Card>
            )
            
            })}
    </div>

  )}
}

export default UserProfile
