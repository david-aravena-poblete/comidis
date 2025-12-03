(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/app/lista/utils/index.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {

if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/app/lista/page.jsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>DocumentSearch
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$lista$2f$utils$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/lista/utils/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
function DocumentSearch() {
    _s();
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const handleChange = (e)=>{
        const value = e.target.value;
        console.log("Valor ingresado:", value);
    };
    const handleSubmitFormSearchProducts = async (e)=>{
        e.preventDefault();
        const searchTerm = e.target.elements.searchTerm.value;
        if (!searchTerm) {
            return;
        }
        setIsLoading(true);
        console.log(`Buscando en 'initialsNames' el valor: ${searchTerm}`);
        try {
            const results = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$lista$2f$utils$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getQueryUser"])(searchTerm);
            console.log('Resultados encontrados:', results);
            onSearchResults(results);
        } catch (error) {
            console.error('Error al buscar productos:', error);
            onSearchResults([]); // Limpiar resultados en caso de error
        } finally{
            setIsLoading(false);
            e.target.elements.searchTerm.value = "";
            e.target.elements.searchTerm.focus();
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            width: "100vw",
            height: "calc(100dvh - 64px)",
            display: "flex",
            flexDirection: "column"
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    width: "100%",
                    flexGrow: 1,
                    backgroundColor: "#f0f0f0"
                }
            }, void 0, false, {
                fileName: "[project]/src/app/lista/page.jsx",
                lineNumber: 47,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    width: "100%",
                    padding: "1rem",
                    backgroundColor: "#fff"
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        type: "text",
                        placeholder: "Buscar...",
                        onChange: handleChange,
                        style: {
                            width: "100%",
                            padding: "0.5rem",
                            fontSize: "1rem"
                        }
                    }, void 0, false, {
                        fileName: "[project]/src/app/lista/page.jsx",
                        lineNumber: 59,
                        columnNumber: 13
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: handleSubmitFormSearchProducts,
                        children: "Buscar"
                    }, void 0, false, {
                        fileName: "[project]/src/app/lista/page.jsx",
                        lineNumber: 69,
                        columnNumber: 13
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/lista/page.jsx",
                lineNumber: 54,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/lista/page.jsx",
        lineNumber: 41,
        columnNumber: 5
    }, this);
}
_s(DocumentSearch, "EmvgwIb3cHpoFpeP+WmEDbjx4y4=");
_c = DocumentSearch;
var _c;
__turbopack_context__.k.register(_c, "DocumentSearch");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_app_lista_2749070b._.js.map