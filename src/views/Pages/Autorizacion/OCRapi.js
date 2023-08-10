import { useEffect } from "react";
import { OCRApi } from "utils/Querycomnet";
import { listar_beneficiariosocr } from "utils/userQuery";
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import FolderIcon from '@mui/icons-material/Folder';
import DeleteIcon from '@mui/icons-material/Delete';
import { Row } from "react-bootstrap";
import { Edit } from "@mui/icons-material";

function generate(element) {
    return [0, 1, 2].map((value) =>
        React.cloneElement(element, {
            key: value,
        }),
    );
}

const Demo = styled('div')(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
}));

export default function OCRApiViews() {
    const [dense, setDense] = React.useState(false);
    const [secondary, setSecondary] = React.useState(false);
    function generatenombreBeneficiario(element) {
        return [...ocrdata.nombreBeneficiario].map((value) =>
            React.cloneElement(element, {
                key: value,
            }),
        );
    }
    const [ocrdata, setData] = React.useState({
        "cedula": "",
        "nombreBeneficiario": [
        ],
        "formas_pagos": [],
        "detalles_pagos": [],
        "cuentas": [
        ],
        "email": "",
        "entidaRecaudadoras": [
        ],
        "baseUrl": "",
        "token": "",
        "botNombre": "botTickets",
        "tipoComprobante": [
        ],
        "key_vision": {
            "type": "service_account",
            "auth_uri": "https://accounts.google.com/o/oauth2/auth",
            "client_id": "115220301207462377992",
            "token_uri": "https://oauth2.googleapis.com/token",
            "project_id": "workcom-ocr",
            "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQChP4WwygPhbcfd\n2HBGpYoS4xiROexdUXDPkOcfRJ2CtP2uwruSNThSEIl22L8YRxA4qXnu+zOQlIX2\nzNSkV/1HLngyl8OLDCvuIC/C9Ax5QSHQoQTqzO4kW0DShJJZNWGm/Zx3fcE/vUP9\nImXuePUIrOHQX+RFOZctlmaHWR+OuwL46JkkrFMSW+gRLUfjqtKI+adQHEiEpcP6\niLq/7UGqzF7yApTgUeIk5jJ2DmXe/1hwLtGtgapr+WS7Kfb0VKkxiaZ2TRP9K7zk\nItnHYMTIo3f+xfQa3ZO8onBDR4cfCIXbShTxiDh9EUGuf8QuGEqfIP2fOsI3nDWe\nj/uarui/AgMBAAECggEAQVf6l1/mHq5cNjyFkzt2Lp000XVFobNlIdg4sOUfZ15t\nBysG1AMZJbhp3G2NUwtJOY0ESqIljUuC1ja/XTIDA5uDPg1eQrTWAJOuhzRa8bBB\nQches8AEKVuJc0YiAGCvh/pyM8IUU/4g1S3hXLhLpA5bHBQf7yWda+3s8qBdN3tQ\nyMd5PHdNe5Q1O6etRtuJWPWN4AXPFHiViORjHUQ/w1IpDY+NyONI9PoVfchazblx\nUuO183FSsQFS3E4Sa70J+8D/A+N6Kyf3P6iAqdd2zGHWqm2G/+b5aodqSLDoPifv\nYbf6oTRPSeuLZnd3U8KcYyHyZp19UV8KfJ+8MJtZAQKBgQDQphnfSKTxUj396yAC\nXMQ/Nhfsu47/8V2B4CKNWpORMOOiH0erjuEC1MnRH66Fxhnj0jGFa0ZQ1JAB7uLe\nV1/YPwCaJKFyqGMqbnbRUthqdosn+h4UZIcia2JSS4nnGHJSKilpIiTppSW2hMt6\n3oeXx1/cH0aCM3YbYvguOjVW/wKBgQDF15OUSUGGxqyvD6khOGP7BLLQ6K/DIF2y\nJ7irk9FcWUVx0B8lngFKHRb6S3beeiKO972OC5p4FkOymHKtj6PZU3Bw9r98j5Tw\nsmbgsxIwN8EbBNPQsyM+z/XeE9tOGdM0KG30nSORfLl25qoSGr4ZIyZPKlHeDbUh\nqIPDlH4uQQKBgBbMX31XWbaIrv9kxq2bZ1Ik3f5fDCQJQpdjX0Mkx4UQ236mflVP\nmmSNzbONC6vQVpnfKMwUSa2hXE7pxF5ZG77sO2ucXwvBPHyxb0g2DjGr3E609L5z\nsZRgOXEWke3vbOZvdvDm6zOgePt1jSpS0GwUO/Q4cqLdbqVVbhrW/2cPAoGAbK0e\nxDX5aK957DAOF9GCGkFaeKdY5TbCQTrQlm98cd4X540Ljv5cdvnDxXnusgclNKOh\n3IVDNPQF+/UCCZT9zEOpYGQqi6HTjuRw3r1/ID2ANfdQ4zOECNzzkioWLbDB88TB\nob0v7Js2xbmvcoJ+KhDE2nfEwNWGyhZnSugm6AECgYB6XGOfftZOQpjeQGyDGQT8\nnfrTp3QP1PP35DN+feywRP/0+5ypgT7xi1GHV4cOdij9JW4d+dgNQbFvD7gmqGAv\nNu04jWNMRZJir3spI0Qv2v1h1TZ05mXLKajNYAl7OLJ+MFfWxrljZ0LKO7jIq7PB\nAyd5EAXrDurQFWxesTOqlQ==\n-----END PRIVATE KEY-----\n",
            "client_email": "workcom-ocr@workcom-ocr.iam.gserviceaccount.com",
            "private_key_id": "040338807d138bfde5c46e2008638e19b1301452",
            "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/workcom-ocr%40workcom-ocr.iam.gserviceaccount.com",
            "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs"
        }
    })
    useEffect(() => {
        listar_beneficiariosocr({
            "cedula": "0923980742"
        }).then(oup => {
            console.log(oup)
            if (oup.success == true) {
                setData(oup.data)
            }
        }).catch(err => {
            console.log(err)
        })
    }, [])
    return (
        <div className=" bg-light p-5 border rounded-5  shadow mx-auto">
            <Box className="" >
                <FormGroup row className="d-none">

                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={secondary}
                                onChange={(event) => setSecondary(event.target.checked)}
                            />
                        }
                        label="Habilitar subtitulo"
                    />
                </FormGroup>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={4}>
                        <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
                            Beneficiario
                        </Typography>
                        <Demo>
                            <List dense={dense} className=" shadow" sx={{ maxHeight: 360, overflow: 'auto', }}>
                                {[...ocrdata.nombreBeneficiario].map((value) => {
                                    return (<ListItem>
                                        <ListItemText
                                            primary={value}
                                            secondary={secondary ? 'Secondary text' : null}
                                            
                                        />
                                        <div className="d-flex  ">
                                            <div className="px-2">
                                                <IconButton edge="end" aria-label="delete">
                                                    <DeleteIcon />
                                                </IconButton>
                                            </div>
                                            <div className="px-2">
                                                <IconButton edge="end" aria-label="delete">
                                                    <Edit />
                                                </IconButton>
                                            </div>
                                            
                                        </div>
                                       
                                    </ListItem>)
                                }


                                )}
                                
                            </List>
                        </Demo>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
                            Cuentas
                        </Typography>
                        <Demo>
                            <List dense={dense} className=" shadow" sx={{ maxHeight: 360, overflow: 'auto', }}>
                                {[...ocrdata.cuentas].map((value) => {
                                    return (<ListItem>
                                        <ListItemText
                                            primary={value}
                                            secondary={secondary ? 'Secondary text' : null}
                                        />
                                    </ListItem>)
                                }


                                )}

                            </List>
                        </Demo>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
                            entidaRecaudadoras
                        </Typography>
                        <Demo>
                            <List dense={dense} className=" shadow" sx={{ maxHeight: 360, overflow: 'auto', }}>
                                {[...ocrdata.entidaRecaudadoras].map((value) => {
                                    return (<ListItem>
                                        <ListItemText
                                            primary={value}
                                            secondary={secondary ? 'Secondary text' : null}
                                        />
                                    </ListItem>)
                                }
                                )}
                            </List>
                        </Demo>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
                            tipoComprobante
                        </Typography>
                        <Demo>
                            <List dense={dense} className=" shadow" sx={{ maxHeight: 360, overflow: 'auto', }}>
                                {[...ocrdata.tipoComprobante].map((value) => {
                                    return (<ListItem>
                                        <ListItemText
                                            primary={value}
                                            secondary={secondary ? 'Secondary text' : null}
                                        />
                                    </ListItem>)
                                }
                                )}
                            </List>
                        </Demo>
                    </Grid>
                </Grid>
                <Grid container spacing={2}>
                   
                </Grid>
            </Box>

        </div>
    )
}