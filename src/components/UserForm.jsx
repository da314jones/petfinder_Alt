export default function UserForm({
  userData,
  handleUserInputChange,
  handleSubmit,
  isEmailValid,
}) {
  return (
    <div>
      <input
        type="text"
        name="name"
        placeholder="Name"
        value={userData.name}
        onChange={handleUserInputChange}
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={userData.email}
        onChange={handleUserInputChange}
      />
      {!isEmailValid(userData.email) && userData.email.trim() !== '' && (
        <p>Email is not valid</p>
      )}
    </div>
  );
}
