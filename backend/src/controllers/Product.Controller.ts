import { Request, Response } from "express";
import Connection from '../server';
import dayjs from 'dayjs'
import log from "../../utils/Logger";
interface Product {
    ProductID: number,
    Name: string,
    Quantity: number,
    LatestEntry: string,
    RegistrationDate: string,
    SecurtyStock: number,
    ExitDate: string,
    Expiration: string,
    TimeLeft: number
}

export function RegisterProductController(req: Request, res: Response) {
    try {
        const { name, quantity, expiration, security, Manager } = req.body
        Connection.run(`INSERT INTO Product(name, quantity, securtystock, expiration, RegistrationDate, LatestEntry, Manager, TimeLeft) VALUES(?, ?, ?, ?, ?, ?, ?, ?)`, [name, quantity, security, expiration, dayjs().format('YYYY-MM-DD'), dayjs().format('YYYY-MM-DD'), Manager, dayjs(expiration, 'YYYY-MM-DD').diff(dayjs(), 'day')])
        res.status(200).send('Success')
    } catch (error) {
        log.error(error)
        res.status(500).send('Error')
    }
}

export function GetProductsController(req: Request, res: Response) {
    try {
        Connection.all('SELECT * FROM Product', (err, rows) => {
            res.status(200).send(rows)
        })
    } catch (error) {
        log.error(error)
        res.status(500).send('Error')
    }
}

export function SearchProductController(req: Request, res: Response) {
    const { key } = req.params
    try {
        Connection.all(`SELECT * FROM Product WHERE Name LIKE '%${key}%'`, (err, rows) => {
            res.status(200).send(rows)
        })
    } catch (error) {
        res.status(500).send('Error')
    }
}

export function DeleteProductController(req: Request, res: Response) {
    const { ID } = req.params
    try {
        Connection.run(`DELETE FROM Product WHERE ProductID = ?`, [ID])
        res.status(200).send('Success')
    } catch (error) {
        console.log(error)
        res.status(500).send('Error')
    }
}

export function GetTimeBeforeExpirationController(req: Request, res: Response) {
    const { ID } = req.params
    try {
        Connection.all(`SELECT TimeLeft FROM Product WHERE ProductID = ?`, [ID], (err, rows: Product[]) => {
            if (rows[0].TimeLeft == 31 || rows[0].TimeLeft == 30) {
                rows[0].TimeLeft = 0
            }
            res.status(200).send(rows)
        })
    } catch (error) {
        res.status(500).send('Error')
    }
}

export function RegisterEntryController(req: Request, res: Response) {
    const { ProductID, LatestEntry, Quantity, Expiration } = req.body
    try {
        Connection.run(`UPDATE Product SET LatestEntry=?, Quantity=(SELECT Quantity + ? FROM Product WHERE ProductID = ?), TimeLeft = ${dayjs(Expiration, 'YYYY-MM-DD').diff(dayjs(), 'day')} WHERE ProductID = ?`, [LatestEntry, Quantity, ProductID, ProductID])
        res.status(200).send('Success')
    } catch (error) {
        res.status(500).send('Error')
    }
}

export function RegisterExitController(req: Request, res: Response) {
    const { ProductID, ExitDate, Quantity } = req.body
    try {
        Connection.run(`UPDATE Product SET ExitDate=?, Quantity=(SELECT Quantity - ? FROM Product WHERE ProductID = ?) WHERE ProductID = ?`, [ExitDate, Quantity, ProductID])
        res.status(200).send('Success')
    } catch (error) {
        res.status(500).send('Error')
    }
}

export function UpdateProductController(req: Request, res: Response) {
    const { Name, Quantity, Expiration, SecurtyStock, ProductID } = req.body
    try {
        Connection.run(`UPDATE Product SET Name = ?, Quantity = ?, Expiration=?, SecurtyStock=? WHERE ProductID = ?, TimeLeft=${dayjs(Expiration, 'YYYY-MM-DD').diff(dayjs(), 'day')}`, [Name, Quantity, Expiration, SecurtyStock, ProductID])
        res.status(200).send('Success')
    } catch (error) {
        res.status(500).send('Erreur')
    }
}