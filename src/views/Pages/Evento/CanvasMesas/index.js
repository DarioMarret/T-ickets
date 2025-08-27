import React, { useRef, useEffect, useState } from "react";

const MesasCanvas = ({ filas }) => {
    const canvasRef = useRef(null);
    const [scale, setScale] = useState(1);
    const [offset, setOffset] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        canvas.width = 1600;
        canvas.height = 800;
        
        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.save();
            ctx.translate(offset.x, offset.y);
            ctx.scale(scale, scale);

            filas.forEach((filaData, rowIndex) => {
                filaData.Mesas.forEach((mesa, colIndex) => {
                    const x = 100 + colIndex * 120;
                    const y = 100 + rowIndex * 120;

                    // Dibujar la mesa
                    ctx.fillStyle = "gray";
                    ctx.fillRect(x, y, 80, 80);
                    ctx.fillStyle = "white";
                    ctx.font = "bold 14px Arial";
                    ctx.textAlign = "center";
                    ctx.fillText(mesa.mesa, x + 40, y + 45);

                    // Dibujar asientos
                    mesa.asientos.forEach((silla, i) => {
                        const angle = (i / mesa.asientos.length) * (2 * Math.PI);
                        const sillaX = x + 40 + Math.cos(angle) * 50;
                        const sillaY = y + 40 + Math.sin(angle) * 50;
                        ctx.fillStyle = silla.estado === "Ocupado" ? "red" : silla.estado === "Reservado" ? "orange" : "green";
                        ctx.beginPath();
                        ctx.arc(sillaX, sillaY, 10, 0, Math.PI * 2);
                        ctx.fill();
                    });
                });
            });

            ctx.restore();
        };

        draw();
    }, [filas, scale, offset]);

    const handleWheel = (e) => {
        e.preventDefault();
        const zoomIntensity = 0.1;
        setScale((prevScale) => Math.min(Math.max(prevScale + (e.deltaY < 0 ? zoomIntensity : -zoomIntensity), 0.5), 3));
    };

    return <canvas ref={canvasRef} onWheel={handleWheel} />;
};

export default MesasCanvas;
