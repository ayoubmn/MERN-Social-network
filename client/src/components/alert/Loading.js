import React from 'react';

const Loading = () => {
    return (
        <div className="position-fixed w-100 h-100 text-center loading"
            style={{ background: "#0008", color: "#f8f8f8", top: 0, left: 0, zIndex: 50 }}>
            {
                <svg xmlns="http://www.w3.org/2000/svg"
                width="205"
                height="250"
                version="1"
                viewBox="0 0 221 229">
                    <metadata>
                        Created by potrace 1.10, written by Peter Selinger 2001-2011
</metadata>
                    <g transform="translate(0.000000,229.000000) scale(0.100000,-0.100000)"
                        fill="#ffffff" stroke="none">
                        <path d="M1402 2150 c-24 -11 -50 -32 -60 -50 -16 -29 -45 -40 -57 -21 -10 17 -142 41 -219 41 -69 0 -78 -2 -108 -29 -30 -27 -33 -34 -36 -104 -3 -57 1 -93 18 -151 l23 -76 -24 -19 c-34 -29 -41 -26 -68 23 -28 53 -55 81 -71 71 -8 -5 1 -21 27 -49 64 -67 66 -72 49 -93 -52 -60 -112 -149 -152 -223 -25 -47 -56 -100 -70 -119 -24 -34 -31 -79 -15 -96 5 -6 12 -27 15 -47 6 -31 4 -38 -9 -38 -10 0 -15 10 -16 28 -2 77 -32 191 -62 239 -33 51 -49 64 -94 70 -50 6 -88 -23 -104 -79 -15 -58 -6 -93 53 -211 8 -16 5 -17 -41 -11 -48 6 -50 5 -87 -34 -30 -33 -42 -40 -64 -36 -36 8 -86 -35 -100 -85 -19 -70 28 -162 89 -174 23 -5 30 -13 35 -41 8 -41 45 -69 87 -64 30 3 31 1 61 -91 22 -64 41 -104 65 -128 32 -34 35 -35 85 -29 29 4 77 18 107 31 29 14 56 23 60 21 4 -3 -15 -49 -41 -103 -27 -54 -47 -107 -46 -118 3 -19 11 -20 256 -22 211 -2 252 0 252 12 0 12 -38 15 -215 17 -118 2 -228 0 -245 -3 -28 -6 -30 -5 -24 15 27 88 170 328 240 403 19 20 33 41 31 47 -5 15 -100 -86 -144 -154 -25 -39 -47 -61 -68 -68 -16 -6 -57 -22 -90 -36 -33 -14 -72 -26 -86 -26 -52 0 -98 67 -134 197 l-18 63 -36 -5 c-43 -6 -69 11 -80 51 -6 25 -3 31 24 50 35 24 136 39 129 19 -8 -19 14 -65 31 -65 14 0 13 3 -2 26 -16 24 -15 29 1 79 l18 53 36 -24 c40 -27 98 -32 128 -10 25 19 15 27 -22 17 -100 -27 -176 62 -104 123 62 51 158 45 197 -13 37 -54 26 -104 -36 -168 -25 -27 -93 -63 -117 -63 -12 0 -14 -4 -7 -13 6 -6 13 -29 16 -51 8 -52 57 -105 57 -61 0 8 9 15 20 15 20 0 175 65 200 84 8 6 32 20 52 30 32 16 42 17 88 6 28 -7 68 -10 89 -6 32 5 41 2 59 -19 12 -14 31 -25 42 -25 29 0 25 9 -10 21 -42 15 -38 31 5 23 23 -4 35 -2 35 5 0 6 -6 11 -12 11 -7 0 -41 13 -75 30 -42 19 -63 25 -63 17 0 -7 12 -18 28 -24 24 -10 19 -11 -39 -12 -51 -1 -68 3 -73 14 -3 8 -14 15 -24 15 -11 0 -40 11 -66 25 -26 14 -53 25 -60 25 -12 0 -66 70 -66 85 0 3 9 1 20 -5 26 -14 25 -10 -7 45 -29 47 -45 58 -36 25 9 -33 -6 -23 -22 16 -8 19 -19 33 -25 29 -6 -3 -10 3 -10 15 0 17 4 21 18 15 20 -8 21 -8 45 -6 30 2 19 21 -13 21 -41 0 -73 36 -66 74 20 100 129 137 190 65 14 -17 26 -39 26 -49 0 -38 48 -127 82 -154 19 -14 40 -26 47 -26 6 0 16 -11 21 -25 5 -14 21 -30 35 -37 28 -12 33 -28 10 -28 -8 0 -20 -9 -27 -20 -18 -28 -61 -25 -128 8 -78 38 -103 79 -97 157 2 33 8 69 12 79 6 14 5 17 -4 12 -7 -5 -16 -18 -21 -30 l-9 -21 0 21 c-1 12 6 27 14 34 21 18 19 33 -4 21 -21 -12 -36 -68 -22 -85 4 -6 11 -33 14 -60 l5 -50 -19 25 c-10 13 -19 19 -19 12 0 -24 13 -43 31 -43 10 0 19 -6 19 -13 0 -21 51 -62 107 -85 52 -22 123 -30 123 -13 0 5 16 21 35 35 l35 27 33 -24 c43 -32 111 -62 175 -77 91 -21 203 11 275 78 35 33 53 66 62 114 4 20 18 45 31 57 13 11 24 28 24 37 0 24 -20 55 -31 49 -5 -4 -5 -14 1 -26 11 -20 6 -39 -11 -39 -5 0 -9 9 -9 19 0 11 -4 22 -8 25 -5 3 -9 -21 -9 -52 -2 -112 -51 -181 -158 -221 -90 -34 -168 -27 -287 26 -58 26 -74 43 -40 43 9 0 31 9 48 19 25 15 44 18 90 14 123 -11 246 72 322 215 28 52 39 63 72 73 54 16 85 5 121 -44 26 -36 30 -48 25 -82 -9 -56 -52 -95 -109 -96 l-42 -1 30 -14 30 -14 -34 6 c-23 4 -31 3 -27 -5 12 -18 65 -12 99 11 47 34 65 59 72 100 17 97 -69 188 -159 168 -20 -4 -36 -6 -36 -5 0 2 7 32 16 66 16 64 16 223 -1 262 -11 26 19 22 39 -5 17 -23 17 -23 11 12 -4 19 -8 44 -10 55 -18 125 -111 294 -183 334 -9 5 -14 12 -11 16 10 9 126 -32 164 -58 80 -55 131 -155 142 -282 3 -38 12 -77 20 -87 10 -11 11 -18 3 -23 -8 -5 -4 -15 11 -31 12 -13 26 -21 32 -17 6 4 7 1 3 -6 -5 -7 -1 -20 8 -30 9 -10 27 -40 41 -67 20 -41 24 -45 25 -24 2 25 2 24 15 -5 9 -21 10 -32 2 -37 -7 -4 -7 -19 2 -50 15 -48 32 -228 24 -241 -3 -5 -9 -4 -13 2 -4 7 -12 -7 -20 -31 -19 -62 -36 -93 -71 -133 -17 -19 -28 -35 -24 -35 4 0 2 -7 -5 -15 -14 -17 -35 -21 -25 -5 3 5 -1 10 -9 10 -9 0 -16 -4 -16 -9 0 -15 -101 -61 -133 -61 -16 0 -26 -4 -22 -10 8 -13 -105 -13 -139 0 -17 6 -26 6 -26 0 0 -5 11 -12 25 -16 44 -11 27 -26 -22 -19 -45 6 -47 5 -29 -9 25 -20 66 -20 92 -1 10 8 38 15 61 15 42 0 42 0 47 -42 7 -52 5 -71 -13 -123 -22 -65 -34 -67 -28 -5 l5 55 -15 -35 c-12 -27 -13 -42 -5 -63 9 -24 7 -37 -11 -73 -21 -44 -34 -53 -53 -34 -17 17 -116 50 -148 50 -44 0 -110 -36 -152 -82 -56 -63 -134 -248 -104 -248 6 0 10 6 10 14 0 20 48 125 81 177 55 87 144 127 228 102 47 -14 103 -45 139 -76 26 -24 31 -4 6 24 -14 16 -14 20 5 46 28 38 73 152 67 169 -3 7 -1 16 4 19 13 8 13 102 0 110 -17 10 -11 27 7 23 20 -4 30 -39 32 -108 1 -33 4 -41 11 -30 13 20 13 96 0 120 -7 13 -7 21 0 25 15 9 30 -39 30 -96 0 -31 4 -48 10 -44 6 3 10 16 11 28 1 18 2 17 9 -6 5 -16 14 -35 21 -43 7 -8 13 -30 15 -47 1 -18 14 -61 29 -96 17 -41 25 -76 23 -97 -4 -37 6 -43 37 -20 18 13 18 16 -9 100 -16 47 -43 110 -61 140 -18 30 -35 75 -39 102 -3 27 -9 61 -12 75 -5 22 -1 28 26 39 45 19 130 106 157 161 83 168 63 371 -53 551 -39 61 -41 67 -26 81 26 23 79 47 102 47 23 0 27 18 5 26 -25 10 -74 -16 -102 -53 l-26 -34 -23 22 c-19 17 -24 33 -24 69 0 58 -23 147 -54 209 -31 60 -82 105 -160 142 -76 36 -167 39 -234 9z m83 -30 c-3 -5 -12 -7 -20 -4 -28 11 -20 -42 19 -116 21 -41 41 -77 44 -80 13 -13 -11 69 -34 117 -15 30 -24 57 -20 60 3 3 7 4 9 2 1 -2 19 -24 38 -49 20 -25 53 -76 73 -113 21 -37 41 -66 44 -63 20 20 -77 201 -108 201 -9 0 -14 8 -12 19 2 12 -1 16 -10 11 -10 -6 -11 -5 -1 5 11 12 18 9 44 -16 54 -51 99 -144 134 -277 12 -47 5 -69 -14 -45 -54 68 -88 99 -127 114 -58 22 -134 14 -185 -21 -21 -14 -41 -25 -44 -25 -7 0 -5 128 3 174 4 22 12 41 18 43 7 2 9 -24 6 -82 -6 -112 13 -114 23 -2 4 45 12 93 18 107 9 22 12 16 19 -49 13 -110 27 -122 28 -24 0 45 -5 85 -10 88 -6 4 -8 11 -4 16 3 5 10 7 15 4 5 -4 9 -1 9 4 0 6 12 11 26 11 14 0 23 -4 19 -10z m-333 -85 c21 -21 61 -72 90 -114 47 -68 49 -74 23 -57 -61 40 -161 12 -234 -65 l-38 -41 -23 57 c-12 30 -20 59 -16 62 3 3 6 -1 6 -9 0 -14 39 -71 40 -58 0 3 -6 26 -14 51 -8 25 -17 75 -21 111 -7 65 -7 66 21 82 17 9 23 16 14 16 -10 1 -8 4 5 9 11 5 28 4 38 -1 14 -7 15 -11 5 -22 -9 -9 -15 -10 -20 -3 -4 7 -15 5 -32 -6 -20 -14 -24 -21 -17 -35 6 -9 21 -44 36 -76 14 -32 28 -57 31 -53 7 7 -16 87 -33 112 -15 22 -17 45 -5 45 5 0 30 -31 57 -70 44 -64 65 -84 65 -62 0 5 -18 37 -41 72 -22 34 -37 65 -34 68 4 4 38 -26 76 -66 39 -39 74 -72 80 -72 19 0 -14 45 -83 114 -37 37 -68 70 -68 72 0 11 59 -28 92 -61z m88 36 c61 -19 56 -6 52 -128 l-2 -56 -38 59 c-21 33 -63 81 -93 107 l-54 48 40 -7 c22 -4 65 -14 95 -23z m303 -207 c85 -43 119 -105 125 -226 5 -102 -15 -205 -57 -294 l-29 -61 -68 -7 c-115 -12 -367 -25 -376 -20 -14 9 -9 162 8 237 40 179 147 332 261 373 51 18 98 17 136 -2z m-283 -19 c17 -9 30 -18 30 -21 0 -4 -17 -27 -39 -53 -49 -59 -82 -124 -115 -229 -21 -67 -26 -104 -27 -189 l0 -106 -76 7 c-42 3 -89 6 -104 6 -25 0 -28 4 -39 54 -21 102 20 287 83 381 97 142 199 195 287 150z m-299 -132 c-33 -46 -81 -178 -87 -241 -9 -81 -14 -87 -51 -65 l-31 17 24 44 c14 25 22 47 19 51 -9 9 -45 -40 -51 -71 -4 -19 -13 -28 -25 -28 -27 0 -23 11 35 94 11 15 20 38 21 49 2 12 7 21 14 20 6 -2 18 8 27 22 9 14 31 42 50 62 19 20 32 39 29 41 -5 6 26 31 38 32 4 0 -1 -12 -12 -27z m-468 -234 c51 -23 98 -129 112 -250 6 -46 4 -56 -8 -56 -32 0 -108 -36 -118 -56 -11 -20 -12 -20 -31 4 -17 20 -19 21 -13 4 31 -89 26 -127 -23 -165 -33 -26 -64 -25 -90 3 -47 50 -55 140 -17 185 44 53 95 50 142 -6 35 -41 29 -9 -18 105 -22 54 -42 109 -45 122 -7 33 14 88 39 106 26 18 38 19 70 4z m1067 -228 c0 -5 -25 -32 -56 -60 -40 -37 -71 -55 -111 -67 -70 -20 -140 -14 -162 14 -9 12 -28 26 -44 31 -24 9 -50 47 -42 61 4 7 135 4 173 -5 22 -5 39 -3 56 8 14 10 53 17 97 20 41 1 77 4 82 5 4 1 7 -2 7 -7z m-483 -23 c33 0 44 -5 49 -21 7 -22 -9 -37 -41 -37 -11 0 -30 -7 -43 -15 -19 -14 -25 -14 -51 -1 -28 15 -81 70 -81 85 0 4 28 3 63 -2 34 -5 81 -9 104 -9z m124 -94 c26 -31 -57 -71 -115 -56 -41 11 -57 39 -31 55 43 26 125 26 146 1z m-967 -20 c9 -3 18 -24 22 -52 3 -26 17 -66 29 -89 25 -45 22 -53 -25 -71 -55 -21 -110 37 -110 116 0 35 6 49 29 73 32 32 32 32 55 23z m537 -130 c7 -9 37 -30 66 -46 29 -16 50 -35 47 -40 -10 -15 -223 -116 -262 -124 -25 -5 -32 -3 -32 9 0 8 -3 28 -6 45 -6 28 -3 32 37 50 48 21 105 72 114 103 8 23 18 24 36 3z"/>
                        <path d="M892 1628 c-7 -7 -12 -19 -12 -27 0 -11 5 -8 16 7 18 25 15 39 -4 20z" />
                        <path d="M830 1461 c-7 -15 -7 -21 0 -21 12 0 25 28 17 36 -3 3 -10 -4 -17
                            -15z"/>
                        <path d="M732 1768 c2 -6 23 -17 47 -24 23 -7 51 -20 62 -30 10 -9 19 -13 19
                            -7 0 12 -38 47 -67 62 -28 14 -66 14 -61 -1z"/>
                        <path d="M1974 1720 c-27 -11 -46 -37 -20 -27 10 4 42 7 73 7 39 0 54 4 51 13
                            -5 15 -74 20 -104 7z"/>
                        <path d="M713 1703 c-7 -2 -13 -12 -13 -20 0 -10 6 -13 16 -9 9 3 39 6 67 7
                            l52 1 -30 13 c-30 14 -70 18 -92 8z"/>
                        <path d="M1975 1671 c-13 -5 2 -10 50 -14 74 -6 81 -4 70 12 -7 12 -90 14
                            -120 2z"/>
                        <path d="M1827 1644 c-4 -4 6 -19 21 -35 15 -15 36 -48 47 -73 11 -25 25 -46
                              32 -46 15 0 -8 59 -46 114 -27 40 -42 52 -54 40z"/>
                        <path d="M1800 1604 c0 -3 11 -20 25 -38 14 -18 25 -38 25 -43 0 -6 7 -17 17
                            -24 15 -13 16 -11 9 16 -9 38 -47 95 -63 95 -7 0 -13 -3 -13 -6z"/>
                        <path d="M1780 1565 c0 -18 50 -79 58 -71 7 8 -33 76 -45 76 -7 0 -13 -2 -13
                            -5z"/>
                        <path d="M1945 1418 c-4 -9 -2 -25 4 -36 6 -11 14 -53 17 -93 6 -60 9 -68 17
                            -48 13 34 1 159 -17 177 -14 14 -16 14 -21 0z"/>
                        <path d="M791 1361 c-8 -5 -10 -14 -6 -21 6 -9 10 -8 17 4 12 21 7 28 -11 17z" />
                        <path d="M1915 1339 c4 -19 11 -52 15 -74 10 -60 22 -20 13 44 -5 32 -14 56
                               -22 59 -11 4 -12 -2 -6 -29z"/>
                        <path d="M1700 1334 c0 -9 5 -14 12 -12 18 6 21 28 4 28 -9 0 -16 -7 -16 -16z" />
                        <path d="M692 1331 c4 -13 18 -16 19 -4 0 4 -5 9 -11 12 -7 2 -11 -2 -8 -8z" />
                        <path d="M1880 1286 c0 -25 5 -48 10 -51 6 -4 10 11 10 39 0 25 -4 48 -10 51
                            -6 4 -10 -11 -10 -39z"/>
                        <path d="M1780 1275 c0 -8 5 -15 10 -15 6 0 10 7 10 15 0 8 -4 15 -10 15 -5 0
                            -10 -7 -10 -15z"/>
                        <path d="M690 1265 c0 -8 5 -15 10 -15 6 0 10 7 10 15 0 8 -4 15 -10 15 -5 0
                            -10 -7 -10 -15z"/>
                        <path d="M1750 1215 c0 -9 5 -15 11 -13 6 2 11 8 11 13 0 5 -5 11 -11 13 -6 2
                            -11 -4 -11 -13z"/>
                        <path d="M1933 1159 c-7 -7 -13 -18 -13 -24 0 -6 -13 -32 -30 -58 -16 -26 -30
                            -53 -30 -60 1 -16 46 39 71 86 22 43 23 77 2 56z"/>
                        <path d="M1854 1108 c-10 -24 -20 -46 -22 -50 -2 -5 0 -8 5 -8 10 0 63 75 63
                                89 0 27 -28 7 -46 -31z"/>
                        <path d="M1815 1110 c-18 -35 -4 -41 19 -8 18 26 20 38 6 38 -5 0 -16 -13 -25
                            -30z"/>
                        <path d="M1698 998 c-27 -9 -39 -28 -19 -28 20 0 61 20 61 30 0 12 -6 12 -42
                            -2z"/>
                        <path d="M1755 980 c-10 -11 -33 -22 -51 -26 -19 -3 -34 -11 -34 -16 0 -26
                            113 17 118 45 5 23 -11 22 -33 -3z"/>
                        <path d="M884 975 c11 -8 27 -15 35 -15 13 1 12 4 -3 15 -11 8 -27 15 -35 15
                            -13 -1 -12 -4 3 -15z"/>
                        <path d="M1650 805 c0 -22 4 -34 10 -30 6 3 10 17 10 30 0 13 -4 27 -10 30 -6
                            4 -10 -8 -10 -30z"/>
                        <path d="M1847 565 c-4 -22 -21 -85 -39 -139 -41 -126 -75 -166 -139 -166 -80
                            1 -239 83 -292 151 -13 17 -27 27 -30 22 -9 -15 56 -90 93 -107 19 -9 64 -32
                            100 -51 53 -28 76 -35 124 -35 52 0 61 3 90 33 18 17 43 59 55 92 12 33 26 69
                            31 80 4 11 11 27 13 35 4 12 6 11 6 -2 1 -10 6 -18 11 -18 14 0 11 67 -4 110
                            l-13 35 -6 -40z"/>
                        <path d="M1230 355 c-19 -6 -30 -14 -24 -17 16 -10 173 -8 179 3 4 5 -2 9 -13
                            9 -10 0 -22 3 -26 8 -12 11 -78 10 -116 -3z"/>
                    </g>
                    <text fill="#fff" x="0" y="47" > Loading</text>
                </svg>

            }

        </div>
    )
}

export default Loading
