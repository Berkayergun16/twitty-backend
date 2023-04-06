import  User  from '../models/User'

const findUser = async (id: string) => {
    return await User.findById(id)
}

export default findUser