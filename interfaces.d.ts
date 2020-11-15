interface ICreateUserRequest {
    email: string,
    password: string,
    role: string,
    firstName: string,
    lastName: string,
    thumbnail?: string,
}

interface IDeleteUserRequest {
    user_email
}

interface IDesignBody {
    category: 'reference' | 'proposal' ,
    title: string,    
    thumbnail: string,
    score?: number,    
}
