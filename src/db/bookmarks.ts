import 'server-only'
import { DeleteCommand, PutCommand, QueryCommand } from '@aws-sdk/lib-dynamodb'
import { db } from './client'
import { Bookmark } from '@/shared/types/bookmark'

const TABLE = 'bookmarks'

export async function getBookmarksByUser(userId: string): Promise<Bookmark[]> {
    const { Items } = await db.send(
        new QueryCommand({
            TableName: TABLE,
            KeyConditionExpression: 'userId = :uid',
            ExpressionAttributeValues: { ':uid': userId },
            ScanIndexForward: false,
        }),
    )
    return (Items as Bookmark[]) ?? []
}

export async function createBookmark(
    data: Omit<Bookmark, 'bookmarkId' | 'createdAt'>,
): Promise<Bookmark> {
    const bookmark: Bookmark = {
        ...data,
        bookmarkId: crypto.randomUUID(),
        createdAt: new Date().toISOString(),
    }
    await db.send(new PutCommand({ TableName: TABLE, Item: bookmark }))
    return bookmark
}

export async function deleteBookmark(userId: string, bookmarkId: string): Promise<void> {
    await db.send(new DeleteCommand({ TableName: TABLE, Key: { userId, bookmarkId } }))
}
