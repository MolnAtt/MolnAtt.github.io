var Quiz = [
["\\( 8b^3+60b^2e+150be^2+125e^3= \\)", 2,
"\\( (4b+25e)^3 \\)",
"\\( (2b+5e)^3 \\)",
"\\( (8b+125e)^3 \\)",
"\\( \\mbox{egyik sem} \\)"],
["\\( 27b^3+135b^2c+225bc^2+125c^3= \\)", 1,
"\\( (3b+5c)^3 \\)",
"\\( \\mbox{egyik sem} \\)",
"\\( (27b+125c)^3 \\)",
"\\( (9b+25c)^3 \\)"],
["\\( 64c^3+125d^3= \\)", 5,
"\\( (4c+5d)(16c^2+20cd+25d^2) \\)",
"\\( (4c-5d)(16c^2-20cd+25d^2) \\)",
"\\( \\mbox{egyik sem} \\)",
"\\( (4c+5d)^3 \\)",
"\\( (4c+5d)(16c^2-20cd+25d^2) \\)",
"\\( (4c+5d)(16c^2-40cd+25d^2) \\)",
"\\( (4c-5d)(16c^2+20cd+25d^2) \\)"],
["\\( 8b^3+8b^3= \\)", 1,
"\\( (2b+2b)(4b^2-4bb+4b^2) \\)",
"\\( (2b+2b)(4b^2+4bb+4b^2) \\)",
"\\( (2b+2b)^3 \\)",
"\\( (2b-2b)(4b^2+4bb+4b^2) \\)",
"\\( (2b+2b)(4b^2-8bb+4b^2) \\)",
"\\( \\mbox{egyik sem} \\)",
"\\( (2b-2b)(4b^2-4bb+4b^2) \\)"],
["\\( 64b^3+64b^3= \\)", 6,
"\\( (4b-4b)(16b^2-16bb+16b^2) \\)",
"\\( (4b+4b)(16b^2+16bb+16b^2) \\)",
"\\( (4b-4b)(16b^2+16bb+16b^2) \\)",
"\\( \\mbox{egyik sem} \\)",
"\\( (4b+4b)(16b^2-32bb+16b^2) \\)",
"\\( (4b+4b)(16b^2-16bb+16b^2) \\)",
"\\( (4b+4b)^3 \\)"],
["\\( 27e^3-135e^2c+225ec^2-125c^3= \\)", 4,
"\\( (3e+5c)^3 \\)",
"\\( (9e+25c)^3 \\)",
"\\( (27e+125c)^3 \\)",
"\\( (3e-5c)^3 \\)",
"\\( \\mbox{egyik sem} \\)"],
["\\( 125b^3+150b^2d+60bd^2+8d^3= \\)", 1,
"\\( (5b+2d)^3 \\)",
"\\( \\mbox{egyik sem} \\)",
"\\( (125b+8d)^3 \\)",
"\\( (25b+4d)^3 \\)"],
["\\( 125c^3-225c^2d+135cd^2-27d^3= \\)", 5,
"\\( (25c+9d)^3 \\)",
"\\( \\mbox{egyik sem} \\)",
"\\( (5c+3d)^3 \\)",
"\\( (125c+27d)^3 \\)",
"\\( (5c-3d)^3 \\)"],
["\\( 125e^3-375e^2c+375ec^2-125c^3= \\)", 2,
"\\( \\mbox{egyik sem} \\)",
"\\( (5e-5c)^3 \\)",
"\\( (5e+5c)^3 \\)",
"\\( (125e+125c)^3 \\)",
"\\( (25e+25c)^3 \\)"],
["\\( 27d^3-108d^2e+144de^2-64e^3= \\)", 4,
"\\( (3d+4e)^3 \\)",
"\\( \\mbox{egyik sem} \\)",
"\\( (9d+16e)^3 \\)",
"\\( (3d-4e)^3 \\)",
"\\( (27d+64e)^3 \\)"],
["\\( 27b^3+54b^2d+36bd^2+8d^3= \\)", 4,
"\\( (27b+8d)^3 \\)",
"\\( (9b+4d)^3 \\)",
"\\( \\mbox{egyik sem} \\)",
"\\( (3b+2d)^3 \\)"],
["\\( 125c^3-27e^3= \\)", 7,
"\\( (5c-3e)^3 \\)",
"\\( (5c-3e)(25c^2+30ce+9e^2) \\)",
"\\( (5c-3e)(25c^2-30ce+9e^2) \\)",
"\\( \\mbox{egyik sem} \\)",
"\\( (5c-3e)(25c^2-15ce+9e^2) \\)",
"\\( (5c+3e)(25c^2-15ce+9e^2) \\)",
"\\( (5c-3e)(25c^2+15ce+9e^2) \\)"],
["\\( 8c^3+27d^3= \\)", 2,
"\\( \\mbox{egyik sem} \\)",
"\\( (2c+3d)(4c^2-6cd+9d^2) \\)",
"\\( (2c-3d)(4c^2+6cd+9d^2) \\)",
"\\( (2c+3d)^3 \\)",
"\\( (2c+3d)(4c^2-12cd+9d^2) \\)",
"\\( (2c+3d)(4c^2+6cd+9d^2) \\)",
"\\( (2c-3d)(4c^2-6cd+9d^2) \\)"],
["\\( 64e^3-144e^2b+108eb^2-27b^3= \\)", 3,
"\\( \\mbox{egyik sem} \\)",
"\\( (64e+27b)^3 \\)",
"\\( (4e-3b)^3 \\)",
"\\( (16e+9b)^3 \\)",
"\\( (4e+3b)^3 \\)"],
["\\( 8d^3-125c^3= \\)", 4,
"\\( (2d-5c)(4d^2+20dc+25c^2) \\)",
"\\( (2d-5c)(4d^2-10dc+25c^2) \\)",
"\\( (2d+5c)(4d^2-10dc+25c^2) \\)",
"\\( (2d-5c)(4d^2+10dc+25c^2) \\)",
"\\( (2d-5c)(4d^2-20dc+25c^2) \\)",
"\\( \\mbox{egyik sem} \\)",
"\\( (2d-5c)^3 \\)"],
["\\( 125c^3+375c^2d+375cd^2+125d^3= \\)", 1,
"\\( (5c+5d)^3 \\)",
"\\( (25c+25d)^3 \\)",
"\\( (125c+125d)^3 \\)",
"\\( \\mbox{egyik sem} \\)"],
["\\( 8d^3-8c^3= \\)", 4,
"\\( \\mbox{egyik sem} \\)",
"\\( (2d+2c)(4d^2-4dc+4c^2) \\)",
"\\( (2d-2c)(4d^2-4dc+4c^2) \\)",
"\\( (2d-2c)(4d^2+4dc+4c^2) \\)",
"\\( (2d-2c)^3 \\)",
"\\( (2d-2c)(4d^2-8dc+4c^2) \\)",
"\\( (2d-2c)(4d^2+8dc+4c^2) \\)"],
["\\( 27e^3+54e^2d+36ed^2+8d^3= \\)", 2,
"\\( \\mbox{egyik sem} \\)",
"\\( (3e+2d)^3 \\)",
"\\( (27e+8d)^3 \\)",
"\\( (9e+4d)^3 \\)"],
["\\( 8b^3+64c^3= \\)", 6,
"\\( (2b-4c)(4b^2-8bc+16c^2) \\)",
"\\( (2b+4c)^3 \\)",
"\\( (2b+4c)(4b^2-16bc+16c^2) \\)",
"\\( (2b+4c)(4b^2+8bc+16c^2) \\)",
"\\( \\mbox{egyik sem} \\)",
"\\( (2b+4c)(4b^2-8bc+16c^2) \\)",
"\\( (2b-4c)(4b^2+8bc+16c^2) \\)"],
["\\( 64b^3-64d^3= \\)", 5,
"\\( (4b+4d)(16b^2-16bd+16d^2) \\)",
"\\( \\mbox{egyik sem} \\)",
"\\( (4b-4d)(16b^2+32bd+16d^2) \\)",
"\\( (4b-4d)(16b^2-32bd+16d^2) \\)",
"\\( (4b-4d)(16b^2+16bd+16d^2) \\)",
"\\( (4b-4d)(16b^2-16bd+16d^2) \\)",
"\\( (4b-4d)^3 \\)"],
["\\( 8b^3+24b^2d+24bd^2+8d^3= \\)", 2,
"\\( (8b+8d)^3 \\)",
"\\( (2b+2d)^3 \\)",
"\\( \\mbox{egyik sem} \\)",
"\\( (4b+4d)^3 \\)"],
["\\( 64c^3+8e^3= \\)", 5,
"\\( (4c+2e)(16c^2+8ce+4e^2) \\)",
"\\( \\mbox{egyik sem} \\)",
"\\( (4c-2e)(16c^2-8ce+4e^2) \\)",
"\\( (4c+2e)^3 \\)",
"\\( (4c+2e)(16c^2-8ce+4e^2) \\)",
"\\( (4c+2e)(16c^2-16ce+4e^2) \\)",
"\\( (4c-2e)(16c^2+8ce+4e^2) \\)"],
["\\( 8b^3-8e^3= \\)", 3,
"\\( (2b-2e)^3 \\)",
"\\( (2b-2e)(4b^2-4be+4e^2) \\)",
"\\( (2b-2e)(4b^2+4be+4e^2) \\)",
"\\( \\mbox{egyik sem} \\)",
"\\( (2b-2e)(4b^2+8be+4e^2) \\)",
"\\( (2b+2e)(4b^2-4be+4e^2) \\)",
"\\( (2b-2e)(4b^2-8be+4e^2) \\)"],
["\\( 8e^3-125c^3= \\)", 5,
"\\( (2e-5c)^3 \\)",
"\\( (2e-5c)(4e^2+20ec+25c^2) \\)",
"\\( (2e-5c)(4e^2-20ec+25c^2) \\)",
"\\( (2e+5c)(4e^2-10ec+25c^2) \\)",
"\\( (2e-5c)(4e^2+10ec+25c^2) \\)",
"\\( (2e-5c)(4e^2-10ec+25c^2) \\)",
"\\( \\mbox{egyik sem} \\)"],
["\\( 8b^3+36b^2b+54bb^2+27b^3= \\)", 1,
"\\( (2b+3b)^3 \\)",
"\\( \\mbox{egyik sem} \\)",
"\\( (4b+9b)^3 \\)",
"\\( (8b+27b)^3 \\)"],
["\\( 125d^3+8c^3= \\)", 7,
"\\( (5d+2c)^3 \\)",
"\\( (5d-2c)(25d^2+10dc+4c^2) \\)",
"\\( (5d-2c)(25d^2-10dc+4c^2) \\)",
"\\( (5d+2c)(25d^2+10dc+4c^2) \\)",
"\\( \\mbox{egyik sem} \\)",
"\\( (5d+2c)(25d^2-20dc+4c^2) \\)",
"\\( (5d+2c)(25d^2-10dc+4c^2) \\)"],
["\\( 27b^3-27e^3= \\)", 3,
"\\( (3b-3e)(9b^2+18be+9e^2) \\)",
"\\( \\mbox{egyik sem} \\)",
"\\( (3b-3e)(9b^2+9be+9e^2) \\)",
"\\( (3b-3e)(9b^2-9be+9e^2) \\)",
"\\( (3b+3e)(9b^2-9be+9e^2) \\)",
"\\( (3b-3e)(9b^2-18be+9e^2) \\)",
"\\( (3b-3e)^3 \\)"],
["\\( 64d^3+125e^3= \\)", 7,
"\\( (4d-5e)(16d^2-20de+25e^2) \\)",
"\\( (4d+5e)^3 \\)",
"\\( (4d+5e)(16d^2+20de+25e^2) \\)",
"\\( (4d+5e)(16d^2-40de+25e^2) \\)",
"\\( (4d-5e)(16d^2+20de+25e^2) \\)",
"\\( \\mbox{egyik sem} \\)",
"\\( (4d+5e)(16d^2-20de+25e^2) \\)"],
["\\( 27d^3+8e^3= \\)", 1,
"\\( (3d+2e)(9d^2-6de+4e^2) \\)",
"\\( (3d-2e)(9d^2+6de+4e^2) \\)",
"\\( (3d-2e)(9d^2-6de+4e^2) \\)",
"\\( \\mbox{egyik sem} \\)",
"\\( (3d+2e)(9d^2+6de+4e^2) \\)",
"\\( (3d+2e)^3 \\)",
"\\( (3d+2e)(9d^2-12de+4e^2) \\)"],
["\\( 125b^3+27b^3= \\)", 2,
"\\( (5b+3b)^3 \\)",
"\\( (5b+3b)(25b^2-15bb+9b^2) \\)",
"\\( (5b-3b)(25b^2+15bb+9b^2) \\)",
"\\( (5b+3b)(25b^2-30bb+9b^2) \\)",
"\\( (5b+3b)(25b^2+15bb+9b^2) \\)",
"\\( (5b-3b)(25b^2-15bb+9b^2) \\)",
"\\( \\mbox{egyik sem} \\)"],
["\\( 64d^3-64c^3= \\)", 1,
"\\( (4d-4c)(16d^2+16dc+16c^2) \\)",
"\\( (4d+4c)(16d^2-16dc+16c^2) \\)",
"\\( \\mbox{egyik sem} \\)",
"\\( (4d-4c)(16d^2-32dc+16c^2) \\)",
"\\( (4d-4c)(16d^2-16dc+16c^2) \\)",
"\\( (4d-4c)(16d^2+32dc+16c^2) \\)",
"\\( (4d-4c)^3 \\)"],
["\\( 8b^3+48b^2e+96be^2+64e^3= \\)", 1,
"\\( (2b+4e)^3 \\)",
"\\( (4b+16e)^3 \\)",
"\\( \\mbox{egyik sem} \\)",
"\\( (8b+64e)^3 \\)"],
["\\( 8d^3+24d^2e+24de^2+8e^3= \\)", 4,
"\\( \\mbox{egyik sem} \\)",
"\\( (4d+4e)^3 \\)",
"\\( (8d+8e)^3 \\)",
"\\( (2d+2e)^3 \\)"],
["\\( 8d^3+48d^2e+96de^2+64e^3= \\)", 1,
"\\( (2d+4e)^3 \\)",
"\\( (4d+16e)^3 \\)",
"\\( (8d+64e)^3 \\)",
"\\( \\mbox{egyik sem} \\)"],
["\\( 8b^3-8c^3= \\)", 1,
"\\( (2b-2c)(4b^2+4bc+4c^2) \\)",
"\\( (2b-2c)(4b^2-8bc+4c^2) \\)",
"\\( (2b-2c)(4b^2-4bc+4c^2) \\)",
"\\( (2b-2c)^3 \\)",
"\\( (2b+2c)(4b^2-4bc+4c^2) \\)",
"\\( \\mbox{egyik sem} \\)",
"\\( (2b-2c)(4b^2+8bc+4c^2) \\)"],
["\\( 8e^3+60e^2b+150eb^2+125b^3= \\)", 4,
"\\( \\mbox{egyik sem} \\)",
"\\( (8e+125b)^3 \\)",
"\\( (4e+25b)^3 \\)",
"\\( (2e+5b)^3 \\)"],
["\\( 125c^3-375c^2d+375cd^2-125d^3= \\)", 3,
"\\( \\mbox{egyik sem} \\)",
"\\( (125c+125d)^3 \\)",
"\\( (5c-5d)^3 \\)",
"\\( (5c+5d)^3 \\)",
"\\( (25c+25d)^3 \\)"],
["\\( 125c^3+8e^3= \\)", 6,
"\\( (5c+2e)^3 \\)",
"\\( (5c-2e)(25c^2+10ce+4e^2) \\)",
"\\( (5c+2e)(25c^2+10ce+4e^2) \\)",
"\\( (5c-2e)(25c^2-10ce+4e^2) \\)",
"\\( \\mbox{egyik sem} \\)",
"\\( (5c+2e)(25c^2-10ce+4e^2) \\)",
"\\( (5c+2e)(25c^2-20ce+4e^2) \\)"],
["\\( 64d^3+27d^3= \\)", 7,
"\\( (4d+3d)^3 \\)",
"\\( (4d-3d)(16d^2+12dd+9d^2) \\)",
"\\( (4d+3d)(16d^2+12dd+9d^2) \\)",
"\\( (4d+3d)(16d^2-24dd+9d^2) \\)",
"\\( \\mbox{egyik sem} \\)",
"\\( (4d-3d)(16d^2-12dd+9d^2) \\)",
"\\( (4d+3d)(16d^2-12dd+9d^2) \\)"],
["\\( 125b^3+375b^2b+375bb^2+125b^3= \\)", 2,
"\\( \\mbox{egyik sem} \\)",
"\\( (5b+5b)^3 \\)",
"\\( (25b+25b)^3 \\)",
"\\( (125b+125b)^3 \\)"],
["\\( 27c^3-54c^2c+36cc^2-8c^3= \\)", 2,
"\\( \\mbox{egyik sem} \\)",
"\\( (3c-2c)^3 \\)",
"\\( (9c+4c)^3 \\)",
"\\( (3c+2c)^3 \\)",
"\\( (27c+8c)^3 \\)"],
["\\( 8c^3+48c^2b+96cb^2+64b^3= \\)", 2,
"\\( (8c+64b)^3 \\)",
"\\( (2c+4b)^3 \\)",
"\\( \\mbox{egyik sem} \\)",
"\\( (4c+16b)^3 \\)"],
["\\( 125b^3-27d^3= \\)", 7,
"\\( \\mbox{egyik sem} \\)",
"\\( (5b-3d)(25b^2+30bd+9d^2) \\)",
"\\( (5b+3d)(25b^2-15bd+9d^2) \\)",
"\\( (5b-3d)(25b^2-30bd+9d^2) \\)",
"\\( (5b-3d)^3 \\)",
"\\( (5b-3d)(25b^2-15bd+9d^2) \\)",
"\\( (5b-3d)(25b^2+15bd+9d^2) \\)"],
["\\( 27b^3+135b^2b+225bb^2+125b^3= \\)", 1,
"\\( (3b+5b)^3 \\)",
"\\( (27b+125b)^3 \\)",
"\\( (9b+25b)^3 \\)",
"\\( \\mbox{egyik sem} \\)"],
["\\( 27b^3+54b^2c+36bc^2+8c^3= \\)", 2,
"\\( \\mbox{egyik sem} \\)",
"\\( (3b+2c)^3 \\)",
"\\( (9b+4c)^3 \\)",
"\\( (27b+8c)^3 \\)"],
["\\( 8b^3+36b^2d+54bd^2+27d^3= \\)", 4,
"\\( \\mbox{egyik sem} \\)",
"\\( (4b+9d)^3 \\)",
"\\( (8b+27d)^3 \\)",
"\\( (2b+3d)^3 \\)"],
["\\( 8e^3+48e^2c+96ec^2+64c^3= \\)", 1,
"\\( (2e+4c)^3 \\)",
"\\( (4e+16c)^3 \\)",
"\\( \\mbox{egyik sem} \\)",
"\\( (8e+64c)^3 \\)"],
["\\( 64b^3-240b^2d+300bd^2-125d^3= \\)", 2,
"\\( \\mbox{egyik sem} \\)",
"\\( (4b-5d)^3 \\)",
"\\( (4b+5d)^3 \\)",
"\\( (16b+25d)^3 \\)",
"\\( (64b+125d)^3 \\)"],
["\\( 27d^3-135d^2d+225dd^2-125d^3= \\)", 3,
"\\( (9d+25d)^3 \\)",
"\\( \\mbox{egyik sem} \\)",
"\\( (3d-5d)^3 \\)",
"\\( (3d+5d)^3 \\)",
"\\( (27d+125d)^3 \\)"],
["\\( 27b^3+54b^2b+36bb^2+8b^3= \\)", 3,
"\\( (9b+4b)^3 \\)",
"\\( (27b+8b)^3 \\)",
"\\( (3b+2b)^3 \\)",
"\\( \\mbox{egyik sem} \\)"],
["\\( 8e^3+36e^2c+54ec^2+27c^3= \\)", 1,
"\\( (2e+3c)^3 \\)",
"\\( (4e+9c)^3 \\)",
"\\( (8e+27c)^3 \\)",
"\\( \\mbox{egyik sem} \\)"],
["\\( 8e^3+24e^2c+24ec^2+8c^3= \\)", 4,
"\\( (8e+8c)^3 \\)",
"\\( \\mbox{egyik sem} \\)",
"\\( (4e+4c)^3 \\)",
"\\( (2e+2c)^3 \\)"],
["\\( 8e^3-24e^2e+24ee^2-8e^3= \\)", 1,
"\\( (2e-2e)^3 \\)",
"\\( (2e+2e)^3 \\)",
"\\( (4e+4e)^3 \\)",
"\\( \\mbox{egyik sem} \\)",
"\\( (8e+8e)^3 \\)"],
["\\( 27c^3-125b^3= \\)", 2,
"\\( (3c-5b)(9c^2-30cb+25b^2) \\)",
"\\( (3c-5b)(9c^2+15cb+25b^2) \\)",
"\\( (3c-5b)(9c^2+30cb+25b^2) \\)",
"\\( (3c-5b)^3 \\)",
"\\( \\mbox{egyik sem} \\)",
"\\( (3c+5b)(9c^2-15cb+25b^2) \\)",
"\\( (3c-5b)(9c^2-15cb+25b^2) \\)"],
["\\( 64c^3-8e^3= \\)", 3,
"\\( (4c-2e)(16c^2+16ce+4e^2) \\)",
"\\( (4c-2e)(16c^2-16ce+4e^2) \\)",
"\\( (4c-2e)(16c^2+8ce+4e^2) \\)",
"\\( (4c-2e)^3 \\)",
"\\( \\mbox{egyik sem} \\)",
"\\( (4c-2e)(16c^2-8ce+4e^2) \\)",
"\\( (4c+2e)(16c^2-8ce+4e^2) \\)"],
["\\( 64e^3+240e^2e+300ee^2+125e^3= \\)", 1,
"\\( (4e+5e)^3 \\)",
"\\( \\mbox{egyik sem} \\)",
"\\( (64e+125e)^3 \\)",
"\\( (16e+25e)^3 \\)"],
["\\( 125d^3+64e^3= \\)", 4,
"\\( (5d+4e)(25d^2-40de+16e^2) \\)",
"\\( (5d-4e)(25d^2-20de+16e^2) \\)",
"\\( (5d+4e)(25d^2+20de+16e^2) \\)",
"\\( (5d+4e)(25d^2-20de+16e^2) \\)",
"\\( (5d-4e)(25d^2+20de+16e^2) \\)",
"\\( (5d+4e)^3 \\)",
"\\( \\mbox{egyik sem} \\)"],
["\\( 64c^3-96c^2c+48cc^2-8c^3= \\)", 2,
"\\( (64c+8c)^3 \\)",
"\\( (4c-2c)^3 \\)",
"\\( \\mbox{egyik sem} \\)",
"\\( (4c+2c)^3 \\)",
"\\( (16c+4c)^3 \\)"],
["\\( 8c^3-24c^2c+24cc^2-8c^3= \\)", 5,
"\\( \\mbox{egyik sem} \\)",
"\\( (8c+8c)^3 \\)",
"\\( (4c+4c)^3 \\)",
"\\( (2c+2c)^3 \\)",
"\\( (2c-2c)^3 \\)"],
["\\( 64b^3-8d^3= \\)", 6,
"\\( (4b-2d)(16b^2+16bd+4d^2) \\)",
"\\( (4b-2d)(16b^2-8bd+4d^2) \\)",
"\\( \\mbox{egyik sem} \\)",
"\\( (4b-2d)^3 \\)",
"\\( (4b-2d)(16b^2-16bd+4d^2) \\)",
"\\( (4b-2d)(16b^2+8bd+4d^2) \\)",
"\\( (4b+2d)(16b^2-8bd+4d^2) \\)"],
["\\( 64d^3+64c^3= \\)", 1,
"\\( (4d+4c)(16d^2-16dc+16c^2) \\)",
"\\( (4d-4c)(16d^2+16dc+16c^2) \\)",
"\\( (4d+4c)(16d^2-32dc+16c^2) \\)",
"\\( (4d+4c)^3 \\)",
"\\( (4d-4c)(16d^2-16dc+16c^2) \\)",
"\\( (4d+4c)(16d^2+16dc+16c^2) \\)",
"\\( \\mbox{egyik sem} \\)"],
["\\( 125c^3-27b^3= \\)", 7,
"\\( (5c+3b)(25c^2-15cb+9b^2) \\)",
"\\( (5c-3b)^3 \\)",
"\\( (5c-3b)(25c^2-15cb+9b^2) \\)",
"\\( (5c-3b)(25c^2+30cb+9b^2) \\)",
"\\( \\mbox{egyik sem} \\)",
"\\( (5c-3b)(25c^2-30cb+9b^2) \\)",
"\\( (5c-3b)(25c^2+15cb+9b^2) \\)"],
["\\( 8d^3+60d^2b+150db^2+125b^3= \\)", 4,
"\\( (4d+25b)^3 \\)",
"\\( \\mbox{egyik sem} \\)",
"\\( (8d+125b)^3 \\)",
"\\( (2d+5b)^3 \\)"],
["\\( 8c^3+36c^2c+54cc^2+27c^3= \\)", 2,
"\\( (8c+27c)^3 \\)",
"\\( (2c+3c)^3 \\)",
"\\( \\mbox{egyik sem} \\)",
"\\( (4c+9c)^3 \\)"],
["\\( 64c^3+96c^2e+48ce^2+8e^3= \\)", 3,
"\\( \\mbox{egyik sem} \\)",
"\\( (16c+4e)^3 \\)",
"\\( (4c+2e)^3 \\)",
"\\( (64c+8e)^3 \\)"],
["\\( 64e^3+144e^2c+108ec^2+27c^3= \\)", 2,
"\\( \\mbox{egyik sem} \\)",
"\\( (4e+3c)^3 \\)",
"\\( (16e+9c)^3 \\)",
"\\( (64e+27c)^3 \\)"],
["\\( 27b^3-27c^3= \\)", 2,
"\\( (3b-3c)(9b^2-9bc+9c^2) \\)",
"\\( (3b-3c)(9b^2+9bc+9c^2) \\)",
"\\( (3b-3c)^3 \\)",
"\\( \\mbox{egyik sem} \\)",
"\\( (3b-3c)(9b^2-18bc+9c^2) \\)",
"\\( (3b+3c)(9b^2-9bc+9c^2) \\)",
"\\( (3b-3c)(9b^2+18bc+9c^2) \\)"],
["\\( 64d^3-192d^2c+192dc^2-64c^3= \\)", 1,
"\\( (4d-4c)^3 \\)",
"\\( (4d+4c)^3 \\)",
"\\( \\mbox{egyik sem} \\)",
"\\( (16d+16c)^3 \\)",
"\\( (64d+64c)^3 \\)"],
["\\( 8c^3-64b^3= \\)", 5,
"\\( (2c-4b)(4c^2-16cb+16b^2) \\)",
"\\( (2c-4b)^3 \\)",
"\\( (2c-4b)(4c^2-8cb+16b^2) \\)",
"\\( (2c+4b)(4c^2-8cb+16b^2) \\)",
"\\( (2c-4b)(4c^2+8cb+16b^2) \\)",
"\\( (2c-4b)(4c^2+16cb+16b^2) \\)",
"\\( \\mbox{egyik sem} \\)"],
["\\( 125c^3+27b^3= \\)", 4,
"\\( (5c-3b)(25c^2-15cb+9b^2) \\)",
"\\( (5c+3b)(25c^2+15cb+9b^2) \\)",
"\\( \\mbox{egyik sem} \\)",
"\\( (5c+3b)(25c^2-15cb+9b^2) \\)",
"\\( (5c+3b)(25c^2-30cb+9b^2) \\)",
"\\( (5c-3b)(25c^2+15cb+9b^2) \\)",
"\\( (5c+3b)^3 \\)"],
["\\( 125d^3+150d^2c+60dc^2+8c^3= \\)", 1,
"\\( (5d+2c)^3 \\)",
"\\( (25d+4c)^3 \\)",
"\\( (125d+8c)^3 \\)",
"\\( \\mbox{egyik sem} \\)"],
["\\( 64b^3+27c^3= \\)", 1,
"\\( (4b+3c)(16b^2-12bc+9c^2) \\)",
"\\( (4b-3c)(16b^2-12bc+9c^2) \\)",
"\\( (4b+3c)^3 \\)",
"\\( (4b-3c)(16b^2+12bc+9c^2) \\)",
"\\( (4b+3c)(16b^2-24bc+9c^2) \\)",
"\\( (4b+3c)(16b^2+12bc+9c^2) \\)",
"\\( \\mbox{egyik sem} \\)"],
["\\( 64d^3+64e^3= \\)", 4,
"\\( \\mbox{egyik sem} \\)",
"\\( (4d-4e)(16d^2+16de+16e^2) \\)",
"\\( (4d-4e)(16d^2-16de+16e^2) \\)",
"\\( (4d+4e)(16d^2-16de+16e^2) \\)",
"\\( (4d+4e)(16d^2+16de+16e^2) \\)",
"\\( (4d+4e)^3 \\)",
"\\( (4d+4e)(16d^2-32de+16e^2) \\)"],
["\\( 64e^3-144e^2d+108ed^2-27d^3= \\)", 4,
"\\( (16e+9d)^3 \\)",
"\\( (4e+3d)^3 \\)",
"\\( \\mbox{egyik sem} \\)",
"\\( (4e-3d)^3 \\)",
"\\( (64e+27d)^3 \\)"],
["\\( 27d^3+125d^3= \\)", 6,
"\\( (3d+5d)(9d^2+15dd+25d^2) \\)",
"\\( (3d+5d)^3 \\)",
"\\( (3d+5d)(9d^2-30dd+25d^2) \\)",
"\\( (3d-5d)(9d^2+15dd+25d^2) \\)",
"\\( \\mbox{egyik sem} \\)",
"\\( (3d+5d)(9d^2-15dd+25d^2) \\)",
"\\( (3d-5d)(9d^2-15dd+25d^2) \\)"],
["\\( 125d^3-300d^2e+240de^2-64e^3= \\)", 2,
"\\( (25d+16e)^3 \\)",
"\\( (5d-4e)^3 \\)",
"\\( (5d+4e)^3 \\)",
"\\( \\mbox{egyik sem} \\)",
"\\( (125d+64e)^3 \\)"],
["\\( 27c^3+108c^2e+144ce^2+64e^3= \\)", 1,
"\\( (3c+4e)^3 \\)",
"\\( (9c+16e)^3 \\)",
"\\( (27c+64e)^3 \\)",
"\\( \\mbox{egyik sem} \\)"],
["\\( 64b^3+8b^3= \\)", 1,
"\\( (4b+2b)(16b^2-8bb+4b^2) \\)",
"\\( (4b-2b)(16b^2-8bb+4b^2) \\)",
"\\( (4b+2b)^3 \\)",
"\\( (4b+2b)(16b^2+8bb+4b^2) \\)",
"\\( \\mbox{egyik sem} \\)",
"\\( (4b+2b)(16b^2-16bb+4b^2) \\)",
"\\( (4b-2b)(16b^2+8bb+4b^2) \\)"],
["\\( 27e^3-54e^2c+36ec^2-8c^3= \\)", 2,
"\\( (9e+4c)^3 \\)",
"\\( (3e-2c)^3 \\)",
"\\( (27e+8c)^3 \\)",
"\\( (3e+2c)^3 \\)",
"\\( \\mbox{egyik sem} \\)"],
["\\( 27b^3+54b^2b+36bb^2+8b^3= \\)", 2,
"\\( \\mbox{egyik sem} \\)",
"\\( (3b+2b)^3 \\)",
"\\( (27b+8b)^3 \\)",
"\\( (9b+4b)^3 \\)"],
["\\( 27b^3-8d^3= \\)", 4,
"\\( (3b+2d)(9b^2-6bd+4d^2) \\)",
"\\( (3b-2d)^3 \\)",
"\\( \\mbox{egyik sem} \\)",
"\\( (3b-2d)(9b^2+6bd+4d^2) \\)",
"\\( (3b-2d)(9b^2-12bd+4d^2) \\)",
"\\( (3b-2d)(9b^2+12bd+4d^2) \\)",
"\\( (3b-2d)(9b^2-6bd+4d^2) \\)"],
["\\( 8b^3+27d^3= \\)", 7,
"\\( (2b+3d)(4b^2+6bd+9d^2) \\)",
"\\( (2b-3d)(4b^2-6bd+9d^2) \\)",
"\\( \\mbox{egyik sem} \\)",
"\\( (2b+3d)^3 \\)",
"\\( (2b-3d)(4b^2+6bd+9d^2) \\)",
"\\( (2b+3d)(4b^2-12bd+9d^2) \\)",
"\\( (2b+3d)(4b^2-6bd+9d^2) \\)"],
["\\( 8d^3-8d^3= \\)", 5,
"\\( (2d-2d)^3 \\)",
"\\( (2d-2d)(4d^2-8dd+4d^2) \\)",
"\\( (2d-2d)(4d^2+8dd+4d^2) \\)",
"\\( (2d-2d)(4d^2-4dd+4d^2) \\)",
"\\( (2d-2d)(4d^2+4dd+4d^2) \\)",
"\\( (2d+2d)(4d^2-4dd+4d^2) \\)",
"\\( \\mbox{egyik sem} \\)"],
["\\( 27c^3-8e^3= \\)", 7,
"\\( (3c-2e)(9c^2+12ce+4e^2) \\)",
"\\( (3c-2e)(9c^2-12ce+4e^2) \\)",
"\\( (3c-2e)^3 \\)",
"\\( (3c+2e)(9c^2-6ce+4e^2) \\)",
"\\( (3c-2e)(9c^2-6ce+4e^2) \\)",
"\\( \\mbox{egyik sem} \\)",
"\\( (3c-2e)(9c^2+6ce+4e^2) \\)"],
["\\( 8b^3+36b^2e+54be^2+27e^3= \\)", 2,
"\\( (8b+27e)^3 \\)",
"\\( (2b+3e)^3 \\)",
"\\( (4b+9e)^3 \\)",
"\\( \\mbox{egyik sem} \\)"],
["\\( 125c^3-375c^2e+375ce^2-125e^3= \\)", 2,
"\\( (25c+25e)^3 \\)",
"\\( (5c-5e)^3 \\)",
"\\( (125c+125e)^3 \\)",
"\\( (5c+5e)^3 \\)",
"\\( \\mbox{egyik sem} \\)"],
["\\( 8d^3-48d^2c+96dc^2-64c^3= \\)", 1,
"\\( (2d-4c)^3 \\)",
"\\( (8d+64c)^3 \\)",
"\\( (2d+4c)^3 \\)",
"\\( \\mbox{egyik sem} \\)",
"\\( (4d+16c)^3 \\)"],
["\\( 125d^3-64e^3= \\)", 7,
"\\( (5d+4e)(25d^2-20de+16e^2) \\)",
"\\( (5d-4e)(25d^2-40de+16e^2) \\)",
"\\( (5d-4e)(25d^2+40de+16e^2) \\)",
"\\( (5d-4e)(25d^2-20de+16e^2) \\)",
"\\( (5d-4e)^3 \\)",
"\\( \\mbox{egyik sem} \\)",
"\\( (5d-4e)(25d^2+20de+16e^2) \\)"],
["\\( 27d^3+135d^2c+225dc^2+125c^3= \\)", 3,
"\\( (27d+125c)^3 \\)",
"\\( (9d+25c)^3 \\)",
"\\( (3d+5c)^3 \\)",
"\\( \\mbox{egyik sem} \\)"],
["\\( 8b^3+48b^2c+96bc^2+64c^3= \\)", 3,
"\\( (4b+16c)^3 \\)",
"\\( \\mbox{egyik sem} \\)",
"\\( (2b+4c)^3 \\)",
"\\( (8b+64c)^3 \\)"],
["\\( 8d^3+64c^3= \\)", 1,
"\\( (2d+4c)(4d^2-8dc+16c^2) \\)",
"\\( (2d+4c)^3 \\)",
"\\( (2d-4c)(4d^2-8dc+16c^2) \\)",
"\\( \\mbox{egyik sem} \\)",
"\\( (2d-4c)(4d^2+8dc+16c^2) \\)",
"\\( (2d+4c)(4d^2+8dc+16c^2) \\)",
"\\( (2d+4c)(4d^2-16dc+16c^2) \\)"],
["\\( 8e^3-125b^3= \\)", 4,
"\\( (2e+5b)(4e^2-10eb+25b^2) \\)",
"\\( (2e-5b)(4e^2-20eb+25b^2) \\)",
"\\( (2e-5b)(4e^2-10eb+25b^2) \\)",
"\\( (2e-5b)(4e^2+10eb+25b^2) \\)",
"\\( (2e-5b)(4e^2+20eb+25b^2) \\)",
"\\( \\mbox{egyik sem} \\)",
"\\( (2e-5b)^3 \\)"],
["\\( 64b^3+192b^2e+192be^2+64e^3= \\)", 1,
"\\( (4b+4e)^3 \\)",
"\\( (16b+16e)^3 \\)",
"\\( (64b+64e)^3 \\)",
"\\( \\mbox{egyik sem} \\)"],
["\\( 64b^3+27b^3= \\)", 2,
"\\( (4b+3b)^3 \\)",
"\\( (4b+3b)(16b^2-12bb+9b^2) \\)",
"\\( (4b+3b)(16b^2+12bb+9b^2) \\)",
"\\( (4b-3b)(16b^2-12bb+9b^2) \\)",
"\\( \\mbox{egyik sem} \\)",
"\\( (4b-3b)(16b^2+12bb+9b^2) \\)",
"\\( (4b+3b)(16b^2-24bb+9b^2) \\)"],
["\\( 64d^3-96d^2c+48dc^2-8c^3= \\)", 4,
"\\( \\mbox{egyik sem} \\)",
"\\( (64d+8c)^3 \\)",
"\\( (4d+2c)^3 \\)",
"\\( (4d-2c)^3 \\)",
"\\( (16d+4c)^3 \\)"],
["\\( 8c^3-64c^3= \\)", 1,
"\\( (2c-4c)(4c^2+8cc+16c^2) \\)",
"\\( \\mbox{egyik sem} \\)",
"\\( (2c-4c)(4c^2-16cc+16c^2) \\)",
"\\( (2c-4c)(4c^2+16cc+16c^2) \\)",
"\\( (2c+4c)(4c^2-8cc+16c^2) \\)",
"\\( (2c-4c)(4c^2-8cc+16c^2) \\)",
"\\( (2c-4c)^3 \\)"],
["\\( 125d^3-375d^2c+375dc^2-125c^3= \\)", 4,
"\\( (5d+5c)^3 \\)",
"\\( \\mbox{egyik sem} \\)",
"\\( (25d+25c)^3 \\)",
"\\( (5d-5c)^3 \\)",
"\\( (125d+125c)^3 \\)"],
["\\( 27c^3-54c^2e+36ce^2-8e^3= \\)", 4,
"\\( \\mbox{egyik sem} \\)",
"\\( (9c+4e)^3 \\)",
"\\( (3c+2e)^3 \\)",
"\\( (3c-2e)^3 \\)",
"\\( (27c+8e)^3 \\)"],
["\\( 125b^3+8e^3= \\)", 5,
"\\( \\mbox{egyik sem} \\)",
"\\( (5b+2e)(25b^2-20be+4e^2) \\)",
"\\( (5b+2e)(25b^2+10be+4e^2) \\)",
"\\( (5b+2e)^3 \\)",
"\\( (5b+2e)(25b^2-10be+4e^2) \\)",
"\\( (5b-2e)(25b^2+10be+4e^2) \\)",
"\\( (5b-2e)(25b^2-10be+4e^2) \\)"],
["\\( 64c^3+8d^3= \\)", 3,
"\\( (4c+2d)(16c^2+8cd+4d^2) \\)",
"\\( (4c-2d)(16c^2-8cd+4d^2) \\)",
"\\( (4c+2d)(16c^2-8cd+4d^2) \\)",
"\\( (4c-2d)(16c^2+8cd+4d^2) \\)",
"\\( (4c+2d)^3 \\)",
"\\( \\mbox{egyik sem} \\)",
"\\( (4c+2d)(16c^2-16cd+4d^2) \\)"],
];
