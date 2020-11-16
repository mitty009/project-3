const mongoose = require('mongoose')
const User = require('./models/userModel')
const Profile = require('./models/profileModel')
const Event = require('./models/eventsModel')

mongoose.connect(
  'mongodb://localhost/cliquedb',
  { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
  (err) => {
    if (err) console.log(err)

    mongoose.connection.db.dropDatabase()
      .then(() => {
        return User.create([
          {
            firstname: 'Mitchell',
            lastname: 'Thomas',
            password: 'mitch',
            passwordConfirmation: 'mitch',
            username: 'mitty',
            email: 'mitty@mitty.com',
            image: 'https://res.cloudinary.com/dky2sqc0z/image/upload/v1605526916/1200px-User_font_awesome.svg_oa84gz.png'
          },
          {
            firstname: 'Harry',
            lastname: 'Todd',
            password: 'harry',
            passwordConfirmation: 'harry',
            username: 'harry',
            email: 'harry@harry.com',
            image: 'https://res.cloudinary.com/dky2sqc0z/image/upload/v1605526916/1200px-User_font_awesome.svg_oa84gz.png'
          },
          {
            firstname: 'Natasha',
            lastname: 'Taylor',
            password: 'natasha',
            passwordConfirmation: 'natasha',
            username: 'natasha',
            email: 'natasha@natasha.com',
            image: 'https://res.cloudinary.com/dky2sqc0z/image/upload/v1605526916/1200px-User_font_awesome.svg_oa84gz.png'
          },
          {
            firstname: 'Sagal',
            lastname: 'Osman',
            password: 'sagal',
            passwordConfirmation: 'sagal',
            username: 'sagal',
            email: 'sagal@sagal.com',
            image: 'https://res.cloudinary.com/dky2sqc0z/image/upload/v1605526916/1200px-User_font_awesome.svg_oa84gz.png'
          }
        ])
      })
      .then((users) => {
        console.log(`${users.length} users have been created`)
        return users
      })
      .then((users) => {
        return Profile
          .create([
            {
              user: users[0],
              topFriends: [users[1], users[2], users[3]],
              friends: [users[1], users[2], users[3]],
              bio: 'BFG',
              private: true
            },
            {
              user: users[1],
              friends: [users[0], users[2], users[3]],
              topFriends: [users[0], users[2], users[3]],
              bio: 'I have been classed as a foot',
              private: true
            },
            {
              user: users[2],
              friends: [users[0], users[1], users[3]],
              topFriends: [users[0], users[1], users[3]],
              bio: 'The friendly square',
              private: true
            },
            {
              user: users[3],
              friends: [users[0], users[1], users[2]],
              topFriends: [users[0], users[1], users[2]],
              bio: 'Hamburger',
              private: true
            }
          ])
      })
      .then(profiles => {
        console.log(`${profiles.length} profiles have been created.`)
        return profiles
      })
      .then(profiles => {
        return Event
          .create([
            {
              eventName: "Harry's Party",
              creator: profiles[0].user,
              location: 'Party Town',
              photo: 'Legend',
              song: 'Baby shark',
              description: 'Come and have a few tinnies with ye old Haz dog',
              invited: [profiles[1].user, profiles[3].user],
              notAttending: [profiles[2].user],
              attendance: 3,
              likes: 0,
              private: false
            },

            {
              eventName: "juice",
              creator: profiles[1].user,
              location: 'Party Town',
              photo: 'Legend',
              song: 'Baby shark',
              description: 'Come and have a few tinnies with ye old Haz dog',
              invited: [profiles[0].user, profiles[3].user],
              attendance: 3,
              likes: 0,
              private: true
            }

          ])
      })
      .then(events => {
        console.log(`${events.length} events have been created`)
      })
      .catch(err => {
        console.log(err)
      })
      .finally(() => {
        mongoose.connection.close()
      })
  }
)