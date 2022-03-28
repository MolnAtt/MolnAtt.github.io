var Quiz = [
["\\( 5b(3e+3b)+2d(3e+3b) = (3e+3b)(5b+2d)= \\)", 3,
"\\( 15be+6bd \\)",
"\\( 3e+3b+5b+2d \\)",
"\\( 15be+15bb+6ed+6bd \\)"],
["\\( (3b-4d)(3b+4d)= \\)", 3,
"\\( \\mbox{egyik sem} \\)",
"\\( 3b^2-4d^2 \\)",
"\\( 9b^2-16d^2 \\)"],
["\\( (5e-4c)(5e+4c)= \\)", 3,
"\\( \\mbox{egyik sem} \\)",
"\\( 5e^2-4c^2 \\)",
"\\( 25e^2-16c^2 \\)"],
["\\( (5e-3b)^2= \\)", 3,
"\\( 5e^2-30eb+3b^2 \\)",
"\\( 5e^2-30eb-3b^2 \\)",
"\\( 25e^2-30eb+9b^2 \\)",
"\\( 5e^2-3b^2 \\)",
"\\( 25e^2-30eb-9b^2 \\)",
"\\( \\mbox{egyik sem} \\)",
"\\( 25e^2-15eb+9b^2 \\)",
"\\( 5e^2-15eb+3b^2 \\)",
"\\( 25e^2-9b^2 \\)"],
["\\( (3c-5b)(3c+5b)= \\)", 2,
"\\( 3c^2-5b^2 \\)",
"\\( 9c^2-25b^2 \\)",
"\\( \\mbox{egyik sem} \\)"],
["\\( (5e-4b)(5e+4b)= \\)", 2,
"\\( \\mbox{egyik sem} \\)",
"\\( 25e^2-16b^2 \\)",
"\\( 5e^2-4b^2 \\)"],
["\\( 3c(5b+5c)+5d(5b+5c) = (5b+5c)(3c+5d)= \\)", 2,
"\\( 15cb+25cd \\)",
"\\( 15cb+15cc+25bd+25cd \\)",
"\\( 5b+5c+3c+5d \\)"],
["\\( 5c(2d+3d)+4c(2d+3d) = (2d+3d)(5c+4c)= \\)", 3,
"\\( 10cd+12dc \\)",
"\\( 2d+3d+5c+4c \\)",
"\\( 10cd+15dc+8dc+12dc \\)"],
["\\( 3d(4d+5e)+2d(4d+5e) = (4d+5e)(3d+2d)= \\)", 3,
"\\( 4d+5e+3d+2d \\)",
"\\( 12dd+10ed \\)",
"\\( 12dd+15ed+8dd+10ed \\)"],
["\\( 3c(3d+2e)+2b(3d+2e) = (3d+2e)(3c+2b)= \\)", 2,
"\\( 9cd+4eb \\)",
"\\( 9cd+6ec+6db+4eb \\)",
"\\( 3d+2e+3c+2b \\)"],
["\\( (3d-4e)^3= \\)", 4,
"\\( 27d^3-64e^3 \\)",
"\\( 3d^3-36d^2e+36de^2-4e^3 \\)",
"\\( 3d^3-12d^2e+12de^2-4e^3 \\)",
"\\( 27d^3-108d^2e+144de^2-64e^3 \\)",
"\\( 27d^3-108d^2e-144de^2-64e^3 \\)",
"\\( 27d^3-36de-64e^3 \\)",
"\\( 27d^3-36d^2e+48de^2-64e^3 \\)",
"\\( 27d^3-12d^2e+12de^2-64e^3 \\)",
"\\( 3d^3-12d^2e+12de^2-4e^3 \\)"],
["\\( (2c-5e)(4c^2+10ce+25e^2)= \\)", 5,
"\\( 2c^3-5e^3 \\)",
"\\( 2c^3+5e^3 \\)",
"\\( 4c^3-25e^3 \\)",
"\\( 8c^3+125e^3 \\)",
"\\( 8c^3-125e^3 \\)",
"\\( 4c^3+25e^3 \\)",
"\\( \\mbox{egyik sem} \\)"],
["\\( (5d-4b)^2= \\)", 3,
"\\( \\mbox{egyik sem} \\)",
"\\( 25d^2-20db+16b^2 \\)",
"\\( 25d^2-40db+16b^2 \\)",
"\\( 5d^2-40db+4b^2 \\)",
"\\( 5d^2-4b^2 \\)",
"\\( 25d^2-16b^2 \\)",
"\\( 5d^2-20db+4b^2 \\)",
"\\( 25d^2-40db-16b^2 \\)",
"\\( 5d^2-40db-4b^2 \\)"],
["\\( 5d(5c+4b)+4d(5c+4b) = (5c+4b)(5d+4d)= \\)", 2,
"\\( 5c+4b+5d+4d \\)",
"\\( 25dc+20bd+20cd+16bd \\)",
"\\( 25dc+16bd \\)"],
["\\( (4b-2e)^2= \\)", 9,
"\\( 4b^2-16be-2e^2 \\)",
"\\( 16b^2-8be+4e^2 \\)",
"\\( \\mbox{egyik sem} \\)",
"\\( 4b^2-16be+2e^2 \\)",
"\\( 4b^2-2e^2 \\)",
"\\( 4b^2-8be+2e^2 \\)",
"\\( 16b^2-16be-4e^2 \\)",
"\\( 16b^2-4e^2 \\)",
"\\( 16b^2-16be+4e^2 \\)"],
["\\( (4e-2c)(4e+2c)= \\)", 1,
"\\( 16e^2-4c^2 \\)",
"\\( \\mbox{egyik sem} \\)",
"\\( 4e^2-2c^2 \\)"],
["\\( (2b-2e)(2b+2e)= \\)", 1,
"\\( 4b^2-4e^2 \\)",
"\\( 2b^2-2e^2 \\)",
"\\( \\mbox{egyik sem} \\)"],
["\\( (3b+3e)^2= \\)", 4,
"\\( \\mbox{egyik sem} \\)",
"\\( 9b^2+9e^2 \\)",
"\\( 3b^2+18be+3e^2 \\)",
"\\( 9b^2+18be+9e^2 \\)",
"\\( 3b^2+9be+3e^2 \\)",
"\\( 9b^2+9be+9e^2 \\)",
"\\( 3b^2+3e^2 \\)"],
["\\( (5c-5e)(25c^2+25ce+25e^2)= \\)", 1,
"\\( 125c^3-125e^3 \\)",
"\\( 5c^3+5e^3 \\)",
"\\( 25c^3+25e^3 \\)",
"\\( 125c^3+125e^3 \\)",
"\\( 25c^3-25e^3 \\)",
"\\( \\mbox{egyik sem} \\)",
"\\( 5c^3-5e^3 \\)"],
["\\( 5b(3e+5d)+5b(3e+5d) = (3e+5d)(5b+5b)= \\)", 2,
"\\( 3e+5d+5b+5b \\)",
"\\( 15be+25db+15eb+25db \\)",
"\\( 15be+25db \\)"],
["\\( (2d-2b)^2= \\)", 5,
"\\( \\mbox{egyik sem} \\)",
"\\( 2d^2-8db+2b^2 \\)",
"\\( 2d^2-4db+2b^2 \\)",
"\\( 4d^2-4b^2 \\)",
"\\( 4d^2-8db+4b^2 \\)",
"\\( 2d^2-8db-2b^2 \\)",
"\\( 2d^2-2b^2 \\)",
"\\( 4d^2-4db+4b^2 \\)",
"\\( 4d^2-8db-4b^2 \\)"],
["\\( (5c-2c)^2= \\)", 4,
"\\( 25c^2-20cc-4c^2 \\)",
"\\( 5c^2-20cc-2c^2 \\)",
"\\( 5c^2-20cc+2c^2 \\)",
"\\( 25c^2-20cc+4c^2 \\)",
"\\( 25c^2-10cc+4c^2 \\)",
"\\( 25c^2-4c^2 \\)",
"\\( \\mbox{egyik sem} \\)",
"\\( 5c^2-10cc+2c^2 \\)",
"\\( 5c^2-2c^2 \\)"],
["\\( (5b+2c)^2= \\)", 1,
"\\( 25b^2+20bc+4c^2 \\)",
"\\( 5b^2+20bc+2c^2 \\)",
"\\( 25b^2+4c^2 \\)",
"\\( \\mbox{egyik sem} \\)",
"\\( 25b^2+10bc+4c^2 \\)",
"\\( 5b^2+2c^2 \\)",
"\\( 5b^2+10bc+2c^2 \\)"],
["\\( (5d-5e)(5d+5e)= \\)", 1,
"\\( 25d^2-25e^2 \\)",
"\\( \\mbox{egyik sem} \\)",
"\\( 5d^2-5e^2 \\)"],
["\\( (3c+2c)(9c^2-6cc+4c^2)= \\)", 2,
"\\( 27c^3-8c^3 \\)",
"\\( 27c^3+8c^3 \\)",
"\\( 9c^3-4c^3 \\)",
"\\( 9c^3+4c^3 \\)",
"\\( 3c^3+2c^3 \\)",
"\\( \\mbox{egyik sem} \\)",
"\\( 3c^3-2c^3 \\)"],
["\\( 2b(2d+4c)+5c(2d+4c) = (2d+4c)(2b+5c)= \\)", 1,
"\\( 4bd+8cb+10dc+20cc \\)",
"\\( 4bd+20cc \\)",
"\\( 2d+4c+2b+5c \\)"],
["\\( (4d-4c)(16d^2+16dc+16c^2)= \\)", 4,
"\\( 16d^3+16c^3 \\)",
"\\( 4d^3-4c^3 \\)",
"\\( 64d^3+64c^3 \\)",
"\\( 64d^3-64c^3 \\)",
"\\( 16d^3-16c^3 \\)",
"\\( 4d^3+4c^3 \\)",
"\\( \\mbox{egyik sem} \\)"],
["\\( (5b+4b)^2= \\)", 4,
"\\( 5b^2+20bb+4b^2 \\)",
"\\( 5b^2+40bb+4b^2 \\)",
"\\( \\mbox{egyik sem} \\)",
"\\( 25b^2+40bb+16b^2 \\)",
"\\( 25b^2+16b^2 \\)",
"\\( 5b^2+4b^2 \\)",
"\\( 25b^2+20bb+16b^2 \\)"],
["\\( (3b-2d)(3b+2d)= \\)", 2,
"\\( \\mbox{egyik sem} \\)",
"\\( 9b^2-4d^2 \\)",
"\\( 3b^2-2d^2 \\)"],
["\\( (2c+3e)^2= \\)", 1,
"\\( 4c^2+12ce+9e^2 \\)",
"\\( 2c^2+6ce+3e^2 \\)",
"\\( 4c^2+6ce+9e^2 \\)",
"\\( 4c^2+9e^2 \\)",
"\\( \\mbox{egyik sem} \\)",
"\\( 2c^2+3e^2 \\)",
"\\( 2c^2+12ce+3e^2 \\)"],
["\\( (5e+2d)^3= \\)", 2,
"\\( 5e^3+30ed+2d^3 \\)",
"\\( 125e^3+150e^2d+60ed^2+8d^3 \\)",
"\\( 125e^3+10e^2d+10ed^2+8d^3 \\)",
"\\( 5e^3+10e^2d+10ed^2+2d^3 \\)",
"\\( 5e^3+10e^2d+10ed^2+2d^3 \\)",
"\\( 5e^3+30e^2d+30ed^2+2d^3 \\)",
"\\( 125e^3+50e^2d+20ed^2+8d^3 \\)",
"\\( 125e^3+8d^3 \\)",
"\\( 125e^3+30ed+8d^3 \\)"],
["\\( 2b(4e+4b)+3d(4e+4b) = (4e+4b)(2b+3d)= \\)", 3,
"\\( 8be+12bd \\)",
"\\( 4e+4b+2b+3d \\)",
"\\( 8be+8bb+12ed+12bd \\)"],
["\\( (4b-2d)(16b^2+8bd+4d^2)= \\)", 2,
"\\( 4b^3-2d^3 \\)",
"\\( 64b^3-8d^3 \\)",
"\\( 16b^3-4d^3 \\)",
"\\( 4b^3+2d^3 \\)",
"\\( 16b^3+4d^3 \\)",
"\\( 64b^3+8d^3 \\)",
"\\( \\mbox{egyik sem} \\)"],
["\\( (4d-3d)(4d+3d)= \\)", 2,
"\\( 4d^2-3d^2 \\)",
"\\( 16d^2-9d^2 \\)",
"\\( \\mbox{egyik sem} \\)"],
["\\( (2d-2b)(4d^2+4db+4b^2)= \\)", 5,
"\\( 4d^3-4b^3 \\)",
"\\( 2d^3-2b^3 \\)",
"\\( 4d^3+4b^3 \\)",
"\\( \\mbox{egyik sem} \\)",
"\\( 8d^3-8b^3 \\)",
"\\( 8d^3+8b^3 \\)",
"\\( 2d^3+2b^3 \\)"],
["\\( (3c-5d)(3c+5d)= \\)", 2,
"\\( \\mbox{egyik sem} \\)",
"\\( 9c^2-25d^2 \\)",
"\\( 3c^2-5d^2 \\)"],
["\\( (3c-2d)(3c+2d)= \\)", 3,
"\\( 3c^2-2d^2 \\)",
"\\( \\mbox{egyik sem} \\)",
"\\( 9c^2-4d^2 \\)"],
["\\( (5d-3d)(25d^2+15dd+9d^2)= \\)", 7,
"\\( 125d^3+27d^3 \\)",
"\\( 5d^3-3d^3 \\)",
"\\( 25d^3+9d^3 \\)",
"\\( \\mbox{egyik sem} \\)",
"\\( 25d^3-9d^3 \\)",
"\\( 5d^3+3d^3 \\)",
"\\( 125d^3-27d^3 \\)"],
["\\( (3c-5e)(3c+5e)= \\)", 3,
"\\( \\mbox{egyik sem} \\)",
"\\( 3c^2-5e^2 \\)",
"\\( 9c^2-25e^2 \\)"],
["\\( (2e-4b)(2e+4b)= \\)", 2,
"\\( \\mbox{egyik sem} \\)",
"\\( 4e^2-16b^2 \\)",
"\\( 2e^2-4b^2 \\)"],
["\\( 2b(2e+3d)+2e(2e+3d) = (2e+3d)(2b+2e)= \\)", 1,
"\\( 4be+6db+4ee+6de \\)",
"\\( 4be+6de \\)",
"\\( 2e+3d+2b+2e \\)"],
["\\( 2d(4d+2b)+2e(4d+2b) = (4d+2b)(2d+2e)= \\)", 3,
"\\( 4d+2b+2d+2e \\)",
"\\( 8dd+4be \\)",
"\\( 8dd+4bd+8de+4be \\)"],
["\\( (3c-5e)^2= \\)", 7,
"\\( 9c^2-30ce-25e^2 \\)",
"\\( 3c^2-30ce-5e^2 \\)",
"\\( 9c^2-25e^2 \\)",
"\\( 3c^2-5e^2 \\)",
"\\( 9c^2-15ce+25e^2 \\)",
"\\( \\mbox{egyik sem} \\)",
"\\( 9c^2-30ce+25e^2 \\)",
"\\( 3c^2-15ce+5e^2 \\)",
"\\( 3c^2-30ce+5e^2 \\)"],
["\\( (5b+5c)^2= \\)", 4,
"\\( \\mbox{egyik sem} \\)",
"\\( 25b^2+25c^2 \\)",
"\\( 5b^2+5c^2 \\)",
"\\( 25b^2+50bc+25c^2 \\)",
"\\( 5b^2+25bc+5c^2 \\)",
"\\( 5b^2+50bc+5c^2 \\)",
"\\( 25b^2+25bc+25c^2 \\)"],
["\\( (2e+4b)^2= \\)", 5,
"\\( 4e^2+16b^2 \\)",
"\\( 4e^2+8eb+16b^2 \\)",
"\\( \\mbox{egyik sem} \\)",
"\\( 2e^2+16eb+4b^2 \\)",
"\\( 4e^2+16eb+16b^2 \\)",
"\\( 2e^2+8eb+4b^2 \\)",
"\\( 2e^2+4b^2 \\)"],
["\\( (4b-2c)(4b+2c)= \\)", 3,
"\\( \\mbox{egyik sem} \\)",
"\\( 4b^2-2c^2 \\)",
"\\( 16b^2-4c^2 \\)"],
["\\( (4b-4d)(16b^2+16bd+16d^2)= \\)", 7,
"\\( 4b^3-4d^3 \\)",
"\\( \\mbox{egyik sem} \\)",
"\\( 4b^3+4d^3 \\)",
"\\( 64b^3+64d^3 \\)",
"\\( 16b^3-16d^3 \\)",
"\\( 16b^3+16d^3 \\)",
"\\( 64b^3-64d^3 \\)"],
["\\( (2c+2c)^2= \\)", 2,
"\\( 2c^2+2c^2 \\)",
"\\( 4c^2+8cc+4c^2 \\)",
"\\( \\mbox{egyik sem} \\)",
"\\( 2c^2+4cc+2c^2 \\)",
"\\( 4c^2+4c^2 \\)",
"\\( 4c^2+4cc+4c^2 \\)",
"\\( 2c^2+8cc+2c^2 \\)"],
["\\( (5c-2d)^2= \\)", 6,
"\\( \\mbox{egyik sem} \\)",
"\\( 25c^2-20cd-4d^2 \\)",
"\\( 5c^2-2d^2 \\)",
"\\( 5c^2-20cd+2d^2 \\)",
"\\( 5c^2-20cd-2d^2 \\)",
"\\( 25c^2-20cd+4d^2 \\)",
"\\( 25c^2-10cd+4d^2 \\)",
"\\( 5c^2-10cd+2d^2 \\)",
"\\( 25c^2-4d^2 \\)"],
["\\( (2b-3b)^2= \\)", 5,
"\\( 4b^2-12bb-9b^2 \\)",
"\\( 2b^2-12bb+3b^2 \\)",
"\\( 2b^2-6bb+3b^2 \\)",
"\\( 4b^2-9b^2 \\)",
"\\( 4b^2-12bb+9b^2 \\)",
"\\( \\mbox{egyik sem} \\)",
"\\( 2b^2-3b^2 \\)",
"\\( 4b^2-6bb+9b^2 \\)",
"\\( 2b^2-12bb-3b^2 \\)"],
["\\( (5c+2d)^2= \\)", 7,
"\\( 5c^2+20cd+2d^2 \\)",
"\\( 5c^2+2d^2 \\)",
"\\( \\mbox{egyik sem} \\)",
"\\( 25c^2+4d^2 \\)",
"\\( 25c^2+10cd+4d^2 \\)",
"\\( 5c^2+10cd+2d^2 \\)",
"\\( 25c^2+20cd+4d^2 \\)"],
["\\( (3d-3b)(3d+3b)= \\)", 1,
"\\( 9d^2-9b^2 \\)",
"\\( \\mbox{egyik sem} \\)",
"\\( 3d^2-3b^2 \\)"],
["\\( (4d-4e)^3= \\)", 6,
"\\( 64d^3-48de-64e^3 \\)",
"\\( 64d^3-192d^2e-192de^2-64e^3 \\)",
"\\( 4d^3-16d^2e+16de^2-4e^3 \\)",
"\\( 4d^3-16d^2e+16de^2-4e^3 \\)",
"\\( 64d^3-64d^2e+64de^2-64e^3 \\)",
"\\( 64d^3-192d^2e+192de^2-64e^3 \\)",
"\\( 64d^3-16d^2e+16de^2-64e^3 \\)",
"\\( 4d^3-48d^2e+48de^2-4e^3 \\)",
"\\( 64d^3-64e^3 \\)"],
["\\( (4c-3d)^2= \\)", 9,
"\\( 4c^2-3d^2 \\)",
"\\( 4c^2-24cd-3d^2 \\)",
"\\( 4c^2-24cd+3d^2 \\)",
"\\( 16c^2-9d^2 \\)",
"\\( 4c^2-12cd+3d^2 \\)",
"\\( 16c^2-12cd+9d^2 \\)",
"\\( 16c^2-24cd-9d^2 \\)",
"\\( \\mbox{egyik sem} \\)",
"\\( 16c^2-24cd+9d^2 \\)"],
["\\( (4d-2e)(16d^2+8de+4e^2)= \\)", 3,
"\\( 16d^3-4e^3 \\)",
"\\( 16d^3+4e^3 \\)",
"\\( 64d^3-8e^3 \\)",
"\\( 4d^3+2e^3 \\)",
"\\( 64d^3+8e^3 \\)",
"\\( \\mbox{egyik sem} \\)",
"\\( 4d^3-2e^3 \\)"],
["\\( (3e-5e)(3e+5e)= \\)", 2,
"\\( 3e^2-5e^2 \\)",
"\\( 9e^2-25e^2 \\)",
"\\( \\mbox{egyik sem} \\)"],
["\\( (2b-5b)(4b^2+10bb+25b^2)= \\)", 2,
"\\( 8b^3+125b^3 \\)",
"\\( 8b^3-125b^3 \\)",
"\\( 4b^3-25b^3 \\)",
"\\( 2b^3+5b^3 \\)",
"\\( 2b^3-5b^3 \\)",
"\\( \\mbox{egyik sem} \\)",
"\\( 4b^3+25b^3 \\)"],
["\\( 5b(4b+2d)+5b(4b+2d) = (4b+2d)(5b+5b)= \\)", 1,
"\\( 20bb+10db+20bb+10db \\)",
"\\( 20bb+10db \\)",
"\\( 4b+2d+5b+5b \\)"],
["\\( 5c(4d+5c)+4d(4d+5c) = (4d+5c)(5c+4d)= \\)", 2,
"\\( 20cd+20cd \\)",
"\\( 20cd+25cc+16dd+20cd \\)",
"\\( 4d+5c+5c+4d \\)"],
["\\( 5c(5c+4d)+5c(5c+4d) = (5c+4d)(5c+5c)= \\)", 2,
"\\( 25cc+20dc \\)",
"\\( 25cc+20dc+25cc+20dc \\)",
"\\( 5c+4d+5c+5c \\)"],
["\\( (5c-4c)(5c+4c)= \\)", 1,
"\\( 25c^2-16c^2 \\)",
"\\( 5c^2-4c^2 \\)",
"\\( \\mbox{egyik sem} \\)"],
["\\( (2b-2e)^2= \\)", 4,
"\\( 2b^2-8be+2e^2 \\)",
"\\( 2b^2-2e^2 \\)",
"\\( 4b^2-8be-4e^2 \\)",
"\\( 4b^2-8be+4e^2 \\)",
"\\( \\mbox{egyik sem} \\)",
"\\( 2b^2-4be+2e^2 \\)",
"\\( 4b^2-4be+4e^2 \\)",
"\\( 2b^2-8be-2e^2 \\)",
"\\( 4b^2-4e^2 \\)"],
["\\( (3e+4e)(9e^2-12ee+16e^2)= \\)", 2,
"\\( 9e^3+16e^3 \\)",
"\\( 27e^3+64e^3 \\)",
"\\( 9e^3-16e^3 \\)",
"\\( 3e^3-4e^3 \\)",
"\\( 3e^3+4e^3 \\)",
"\\( 27e^3-64e^3 \\)",
"\\( \\mbox{egyik sem} \\)"],
["\\( (5b-3c)^2= \\)", 5,
"\\( 25b^2-15bc+9c^2 \\)",
"\\( 5b^2-30bc-3c^2 \\)",
"\\( 5b^2-15bc+3c^2 \\)",
"\\( 25b^2-30bc-9c^2 \\)",
"\\( 25b^2-30bc+9c^2 \\)",
"\\( 25b^2-9c^2 \\)",
"\\( 5b^2-30bc+3c^2 \\)",
"\\( 5b^2-3c^2 \\)",
"\\( \\mbox{egyik sem} \\)"],
["\\( (3b+2d)^3= \\)", 4,
"\\( 27b^3+6b^2d+6bd^2+8d^3 \\)",
"\\( 3b^3+18bd+2d^3 \\)",
"\\( 3b^3+18b^2d+18bd^2+2d^3 \\)",
"\\( 27b^3+54b^2d+36bd^2+8d^3 \\)",
"\\( 3b^3+6b^2d+6bd^2+2d^3 \\)",
"\\( 27b^3+18b^2d+12bd^2+8d^3 \\)",
"\\( 27b^3+8d^3 \\)",
"\\( 3b^3+6b^2d+6bd^2+2d^3 \\)",
"\\( 27b^3+18bd+8d^3 \\)"],
["\\( (3c-2c)^2= \\)", 5,
"\\( 3c^2-12cc-2c^2 \\)",
"\\( 3c^2-6cc+2c^2 \\)",
"\\( 9c^2-6cc+4c^2 \\)",
"\\( 9c^2-12cc-4c^2 \\)",
"\\( 9c^2-12cc+4c^2 \\)",
"\\( 3c^2-2c^2 \\)",
"\\( \\mbox{egyik sem} \\)",
"\\( 9c^2-4c^2 \\)",
"\\( 3c^2-12cc+2c^2 \\)"],
["\\( (4b+4d)^2= \\)", 1,
"\\( 16b^2+32bd+16d^2 \\)",
"\\( 16b^2+16d^2 \\)",
"\\( 4b^2+16bd+4d^2 \\)",
"\\( \\mbox{egyik sem} \\)",
"\\( 4b^2+4d^2 \\)",
"\\( 16b^2+16bd+16d^2 \\)",
"\\( 4b^2+32bd+4d^2 \\)"],
["\\( (3c-2d)(3c+2d)= \\)", 2,
"\\( 3c^2-2d^2 \\)",
"\\( 9c^2-4d^2 \\)",
"\\( \\mbox{egyik sem} \\)"],
["\\( (3e-5e)(9e^2+15ee+25e^2)= \\)", 6,
"\\( 9e^3+25e^3 \\)",
"\\( \\mbox{egyik sem} \\)",
"\\( 3e^3-5e^3 \\)",
"\\( 27e^3+125e^3 \\)",
"\\( 9e^3-25e^3 \\)",
"\\( 27e^3-125e^3 \\)",
"\\( 3e^3+5e^3 \\)"],
["\\( (5e-3b)(25e^2+15eb+9b^2)= \\)", 7,
"\\( 25e^3-9b^3 \\)",
"\\( 5e^3-3b^3 \\)",
"\\( \\mbox{egyik sem} \\)",
"\\( 125e^3+27b^3 \\)",
"\\( 25e^3+9b^3 \\)",
"\\( 5e^3+3b^3 \\)",
"\\( 125e^3-27b^3 \\)"],
["\\( (5e-3b)^2= \\)", 6,
"\\( 25e^2-9b^2 \\)",
"\\( 25e^2-30eb-9b^2 \\)",
"\\( 5e^2-15eb+3b^2 \\)",
"\\( 5e^2-30eb+3b^2 \\)",
"\\( 5e^2-30eb-3b^2 \\)",
"\\( 25e^2-30eb+9b^2 \\)",
"\\( 25e^2-15eb+9b^2 \\)",
"\\( \\mbox{egyik sem} \\)",
"\\( 5e^2-3b^2 \\)"],
["\\( (2c-4c)(2c+4c)= \\)", 1,
"\\( 4c^2-16c^2 \\)",
"\\( 2c^2-4c^2 \\)",
"\\( \\mbox{egyik sem} \\)"],
["\\( 2e(2d+5e)+2c(2d+5e) = (2d+5e)(2e+2c)= \\)", 3,
"\\( 2d+5e+2e+2c \\)",
"\\( 4ed+10ec \\)",
"\\( 4ed+10ee+4dc+10ec \\)"],
["\\( (2b-5c)^2= \\)", 8,
"\\( 2b^2-20bc-5c^2 \\)",
"\\( 2b^2-5c^2 \\)",
"\\( 4b^2-20bc-25c^2 \\)",
"\\( 4b^2-10bc+25c^2 \\)",
"\\( 2b^2-20bc+5c^2 \\)",
"\\( 4b^2-25c^2 \\)",
"\\( 2b^2-10bc+5c^2 \\)",
"\\( 4b^2-20bc+25c^2 \\)",
"\\( \\mbox{egyik sem} \\)"],
["\\( (3c-3d)(3c+3d)= \\)", 2,
"\\( 3c^2-3d^2 \\)",
"\\( 9c^2-9d^2 \\)",
"\\( \\mbox{egyik sem} \\)"],
["\\( (3e-4d)^3= \\)", 3,
"\\( 27e^3-36ed-64d^3 \\)",
"\\( 3e^3-36e^2d+36ed^2-4d^3 \\)",
"\\( 27e^3-108e^2d+144ed^2-64d^3 \\)",
"\\( 27e^3-12e^2d+12ed^2-64d^3 \\)",
"\\( 27e^3-64d^3 \\)",
"\\( 27e^3-36e^2d+48ed^2-64d^3 \\)",
"\\( 3e^3-12e^2d+12ed^2-4d^3 \\)",
"\\( 27e^3-108e^2d-144ed^2-64d^3 \\)",
"\\( 3e^3-12e^2d+12ed^2-4d^3 \\)"],
["\\( 3c(3c+4c)+4b(3c+4c) = (3c+4c)(3c+4b)= \\)", 1,
"\\( 9cc+12cc+12cb+16cb \\)",
"\\( 3c+4c+3c+4b \\)",
"\\( 9cc+16cb \\)"],
["\\( (5b-5b)^3= \\)", 7,
"\\( 125b^3-25b^2b+25bb^2-125b^3 \\)",
"\\( 125b^3-375b^2b-375bb^2-125b^3 \\)",
"\\( 125b^3-125b^3 \\)",
"\\( 125b^3-125b^2b+125bb^2-125b^3 \\)",
"\\( 5b^3-75b^2b+75bb^2-5b^3 \\)",
"\\( 5b^3-25b^2b+25bb^2-5b^3 \\)",
"\\( 125b^3-375b^2b+375bb^2-125b^3 \\)",
"\\( 125b^3-75bb-125b^3 \\)",
"\\( 5b^3-25b^2b+25bb^2-5b^3 \\)"],
["\\( (2b-5d)(2b+5d)= \\)", 2,
"\\( 2b^2-5d^2 \\)",
"\\( 4b^2-25d^2 \\)",
"\\( \\mbox{egyik sem} \\)"],
["\\( (2d+5b)^2= \\)", 5,
"\\( \\mbox{egyik sem} \\)",
"\\( 2d^2+10db+5b^2 \\)",
"\\( 2d^2+20db+5b^2 \\)",
"\\( 4d^2+25b^2 \\)",
"\\( 4d^2+20db+25b^2 \\)",
"\\( 2d^2+5b^2 \\)",
"\\( 4d^2+10db+25b^2 \\)"],
["\\( (3b+2e)^2= \\)", 7,
"\\( 9b^2+6be+4e^2 \\)",
"\\( 3b^2+2e^2 \\)",
"\\( 3b^2+12be+2e^2 \\)",
"\\( 3b^2+6be+2e^2 \\)",
"\\( 9b^2+4e^2 \\)",
"\\( \\mbox{egyik sem} \\)",
"\\( 9b^2+12be+4e^2 \\)"],
["\\( (3e+2e)^3= \\)", 8,
"\\( 27e^3+6e^2e+6ee^2+8e^3 \\)",
"\\( 3e^3+6e^2e+6ee^2+2e^3 \\)",
"\\( 27e^3+18e^2e+12ee^2+8e^3 \\)",
"\\( 27e^3+18ee+8e^3 \\)",
"\\( 27e^3+8e^3 \\)",
"\\( 3e^3+18ee+2e^3 \\)",
"\\( 3e^3+18e^2e+18ee^2+2e^3 \\)",
"\\( 27e^3+54e^2e+36ee^2+8e^3 \\)",
"\\( 3e^3+6e^2e+6ee^2+2e^3 \\)"],
["\\( (3b-4e)^2= \\)", 8,
"\\( 3b^2-24be-4e^2 \\)",
"\\( 9b^2-24be-16e^2 \\)",
"\\( 3b^2-24be+4e^2 \\)",
"\\( 3b^2-12be+4e^2 \\)",
"\\( 3b^2-4e^2 \\)",
"\\( 9b^2-12be+16e^2 \\)",
"\\( \\mbox{egyik sem} \\)",
"\\( 9b^2-24be+16e^2 \\)",
"\\( 9b^2-16e^2 \\)"],
["\\( 2d(2e+2b)+3e(2e+2b) = (2e+2b)(2d+3e)= \\)", 2,
"\\( 4de+6be \\)",
"\\( 4de+4bd+6ee+6be \\)",
"\\( 2e+2b+2d+3e \\)"],
["\\( (4d+3c)^2= \\)", 5,
"\\( 16d^2+9c^2 \\)",
"\\( 4d^2+3c^2 \\)",
"\\( \\mbox{egyik sem} \\)",
"\\( 4d^2+12dc+3c^2 \\)",
"\\( 16d^2+24dc+9c^2 \\)",
"\\( 16d^2+12dc+9c^2 \\)",
"\\( 4d^2+24dc+3c^2 \\)"],
["\\( (2e+2e)^2= \\)", 2,
"\\( 2e^2+2e^2 \\)",
"\\( 4e^2+8ee+4e^2 \\)",
"\\( 4e^2+4e^2 \\)",
"\\( 2e^2+4ee+2e^2 \\)",
"\\( \\mbox{egyik sem} \\)",
"\\( 4e^2+4ee+4e^2 \\)",
"\\( 2e^2+8ee+2e^2 \\)"],
["\\( (5c+3d)^2= \\)", 1,
"\\( 25c^2+30cd+9d^2 \\)",
"\\( 5c^2+15cd+3d^2 \\)",
"\\( 5c^2+3d^2 \\)",
"\\( 5c^2+30cd+3d^2 \\)",
"\\( 25c^2+9d^2 \\)",
"\\( \\mbox{egyik sem} \\)",
"\\( 25c^2+15cd+9d^2 \\)"],
["\\( (5c+2d)^2= \\)", 1,
"\\( 25c^2+20cd+4d^2 \\)",
"\\( 25c^2+4d^2 \\)",
"\\( \\mbox{egyik sem} \\)",
"\\( 25c^2+10cd+4d^2 \\)",
"\\( 5c^2+20cd+2d^2 \\)",
"\\( 5c^2+10cd+2d^2 \\)",
"\\( 5c^2+2d^2 \\)"],
["\\( 5c(3d+2b)+3e(3d+2b) = (3d+2b)(5c+3e)= \\)", 2,
"\\( 3d+2b+5c+3e \\)",
"\\( 15cd+10bc+9de+6be \\)",
"\\( 15cd+6be \\)"],
["\\( 3c(4e+2c)+3d(4e+2c) = (4e+2c)(3c+3d)= \\)", 1,
"\\( 12ce+6cc+12ed+6cd \\)",
"\\( 4e+2c+3c+3d \\)",
"\\( 12ce+6cd \\)"],
["\\( (4e-2b)^2= \\)", 3,
"\\( 16e^2-16eb-4b^2 \\)",
"\\( 16e^2-8eb+4b^2 \\)",
"\\( 16e^2-16eb+4b^2 \\)",
"\\( 4e^2-16eb+2b^2 \\)",
"\\( 4e^2-8eb+2b^2 \\)",
"\\( 4e^2-2b^2 \\)",
"\\( \\mbox{egyik sem} \\)",
"\\( 4e^2-16eb-2b^2 \\)",
"\\( 16e^2-4b^2 \\)"],
["\\( (2e-4c)(2e+4c)= \\)", 2,
"\\( 2e^2-4c^2 \\)",
"\\( 4e^2-16c^2 \\)",
"\\( \\mbox{egyik sem} \\)"],
["\\( (4d-5b)(4d+5b)= \\)", 2,
"\\( \\mbox{egyik sem} \\)",
"\\( 16d^2-25b^2 \\)",
"\\( 4d^2-5b^2 \\)"],
["\\( 3e(4d+2d)+5e(4d+2d) = (4d+2d)(3e+5e)= \\)", 1,
"\\( 12ed+6de+20de+10de \\)",
"\\( 12ed+10de \\)",
"\\( 4d+2d+3e+5e \\)"],
["\\( 2e(3e+4d)+4e(3e+4d) = (3e+4d)(2e+4e)= \\)", 2,
"\\( 6ee+16de \\)",
"\\( 6ee+8de+12ee+16de \\)",
"\\( 3e+4d+2e+4e \\)"],
["\\( (3b-5b)(3b+5b)= \\)", 1,
"\\( 9b^2-25b^2 \\)",
"\\( \\mbox{egyik sem} \\)",
"\\( 3b^2-5b^2 \\)"],
["\\( (2c-3b)(2c+3b)= \\)", 3,
"\\( 2c^2-3b^2 \\)",
"\\( \\mbox{egyik sem} \\)",
"\\( 4c^2-9b^2 \\)"],
["\\( (4c-4c)^2= \\)", 1,
"\\( 16c^2-32cc+16c^2 \\)",
"\\( 16c^2-16cc+16c^2 \\)",
"\\( 4c^2-16cc+4c^2 \\)",
"\\( 16c^2-32cc-16c^2 \\)",
"\\( 4c^2-4c^2 \\)",
"\\( 4c^2-32cc-4c^2 \\)",
"\\( 16c^2-16c^2 \\)",
"\\( 4c^2-32cc+4c^2 \\)",
"\\( \\mbox{egyik sem} \\)"],
["\\( (3e-5b)(3e+5b)= \\)", 3,
"\\( 3e^2-5b^2 \\)",
"\\( \\mbox{egyik sem} \\)",
"\\( 9e^2-25b^2 \\)"],
["\\( (2c+4c)^3= \\)", 3,
"\\( 2c^3+8c^2c+8cc^2+4c^3 \\)",
"\\( 8c^3+16c^2c+32cc^2+64c^3 \\)",
"\\( 8c^3+48c^2c+96cc^2+64c^3 \\)",
"\\( 8c^3+64c^3 \\)",
"\\( 2c^3+24cc+4c^3 \\)",
"\\( 2c^3+8c^2c+8cc^2+4c^3 \\)",
"\\( 8c^3+8c^2c+8cc^2+64c^3 \\)",
"\\( 2c^3+24c^2c+24cc^2+4c^3 \\)",
"\\( 8c^3+24cc+64c^3 \\)"],
];