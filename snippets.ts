
// const testUser: Document = new UserModel({
//   firstName: 'Jarda',
//   lastName: 'Cicvarek',
//   email: 'jarda.cicvarek@email.com',
//   password: '123456'
// });

// testUser.save()
// .then((storedUser: Document) => {
//   res.status(200).send(storedUser);
// })
// .catch(err => {
//   console.log(err);
//   res.status(500).send({
//     error: 'Error while saving user.'
//   });
// })


// UserModel.findOne({ email: 'jarda.cicvarek@email.com' })
// .then((user: IUserModel) => {
//   return user.comparePassword('123456');
// })
// .then((match) => {
//   res.status(200).send({
//     message: 'password correct: ' + match
//   });
// })
// .catch((err) => {
//   console.log(err);
//   res.status(500).send({
//     message: 'Error while checking user'
//   });
// })