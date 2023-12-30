import Connection from "../server";
import { Request, Response } from "express";
export function CheckManagerCodeController(req: Request, res: Response) {
    const { code } = req.params
    try {
        Connection.all(`SELECT * FROM Manager WHERE Code=?`, [code], (err, rows) => {
            res.status(200).send(rows)
        })
    } catch (error) {
        res.status(500).send('Error')
    }
}
export function RetrieveAccountDataController(req: Request, res: Response) {
    const { FirstName, LastName, Phone_Number } = req.body
    try {
    Connection.all(`SELECT * FROM Manager WHERE FirstName=? AND LastName=? AND Phone_Number=?`, [FirstName, LastName, Phone_Number], (err, rows) => {
            res.status(200).send(rows)
        })
    } catch (error) {
        res.status(500).send('Error')
    }
}
export function AddAccountController(req: Request, res: Response) {
    const { FirstName, LastName, Phone_Number, code } = req.body
    try {
        Connection.run(`INSERT INTO Manager(Code, FirstName, LastName, Phone_Number) VALUES(?, ?, ?, ?)`, [code, FirstName, LastName, Phone_Number])
        res.status(200).send('Success')
    } catch (error) {
        res.status(500).send('Error')
    }

}