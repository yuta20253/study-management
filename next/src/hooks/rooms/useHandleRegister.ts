export const useHandleRegister = (
  createRoom: (
    user_id: number,
    firstName: string,
    secondName: string,
  ) => Promise<void>,
) => {
  const handleRegister = (
    user_id: number,
    firstName: string,
    secondName: string,
  ) => {
    createRoom(user_id, firstName, secondName)
  }

  return {
    handleRegister,
  }
}
