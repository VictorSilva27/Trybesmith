import { ResultSetHeader, RowDataPacket } from 'mysql2';
import mysql from './connection';
import { IUser } from '../interfaces/IUser';
import { ILogin } from '../interfaces/ILogin';

export default class UserModel {
  private connection = mysql;

  public async getUserByUsernameAndPassword(login: ILogin): Promise<IUser[]> {
    const { username, password } = login;
    const [rows] = await this.connection.execute<(
    IUser[] & RowDataPacket[])>(
      ' SELECT * FROM Trybesmith.Users WHERE username = ? AND password = ?',
      [username, password],
      );

    return rows;
  }

  async insertUser(user: IUser) {
    const { username, classe, level, password } = user;
    const result = await this.connection.execute<ResultSetHeader>(
      ` 
          INSERT INTO
          Trybesmith.Users (username, classe, level, password)
          VALUES
              (?, ?, ?, ?)
      `,
      [username, classe, level, password],
    );

    const [dataInserted] = result;
    const { insertId } = dataInserted;
    return { id: insertId, ...user };
  }
}