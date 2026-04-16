import 'server-only'
import { GetCommand, PutCommand, ScanCommand } from '@aws-sdk/lib-dynamodb'
import { db } from './client'
import { User } from '@/shared/types/user'

const TABLE = 'users'

export async function getUserByEmail(email: string): Promise<User | null> {
    const { Items } = await db.send(
        new ScanCommand({
            TableName: TABLE,
            FilterExpression: 'email = :email',
            ExpressionAttributeValues: { ':email': email },
        }),
    )
    return (Items?.[0] as User) ?? null
}

export async function getUserById(userId: string): Promise<User | null> {
    const { Item } = await db.send(new GetCommand({ TableName: TABLE, Key: { userId } }))
    return (Item as User) ?? null
}

export async function createUser(data: Pick<User, 'email' | 'passwordHash'>): Promise<User> {
    const user: User = {
        ...data,
        userId: crypto.randomUUID(),
        createdAt: new Date().toISOString(),
    }
    await db.send(new PutCommand({ TableName: TABLE, Item: user }))
    return user
}
