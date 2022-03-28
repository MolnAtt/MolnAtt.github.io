function PolSzamQuizInternet
feladat = cell(10,1);
    feladat{1}='full squares, difference of squares';
        PolszamJSCQs(PolszamgyakQuizPeldak(300, [2 2 3 0 0 0 0 0]),1, 'quiz1f.html', 'quiz1f.js', 'factorizing square related expressions');
        PolszamJSCQs(PolszamgyakQuizPeldak(300, [2 2 3 0 0 0 0 0]),2, 'quiz1e.html', 'quiz1e.js', 'expanding square related expressions');
    feladat{2}='distributivity in general / Double factorisation, Group formation';
        PolszamJSCQs(PolszamgyakQuizPeldak(100, [0 0 0 0 0 0 0 1]),1, 'quiz2f.html', 'quiz2f.js', 'factorization by forming groups');
        PolszamJSCQs(PolszamgyakQuizPeldak(100, [0 0 0 0 0 0 0 1]),2, 'quiz2e.html', 'quiz2e.js', 'expansion in general');
    feladat{3}='full cubes';
        PolszamJSCQs(PolszamgyakQuizPeldak(100, [0 0 0 0 0 1 1 0]),1, 'quiz3f.html', 'quiz3f.js', 'factorizing into full cubes');
        PolszamJSCQs(PolszamgyakQuizPeldak(100, [0 0 0 0 0 1 1 0]),2, 'quiz3e.html', 'quiz3e.js', 'expanding full cubes');
    feladat{4}='sum and difference of cubes';
        PolszamJSCQs(PolszamgyakQuizPeldak(100, [0 0 0 1 1 0 0 0]),1, 'quiz4f.html', 'quiz4f.js', 'factorizing sum of cubes');
        PolszamJSCQs(PolszamgyakQuizPeldak(100, [0 0 0 1 1 0 0 0]),2, 'quiz4e.html', 'quiz4e.js', 'expanding into sum of cubes');
    feladat{5}='cubes in general';
        PolszamJSCQs(PolszamgyakQuizPeldak(100, [0 0 0 1 1 1 1 0]),1, 'quiz5e.html', 'quiz5f.js', 'factorizing cube related expressions');
        PolszamJSCQs(PolszamgyakQuizPeldak(100, [0 0 0 1 1 1 1 0]),2, 'quiz5f.html', 'quiz5e.js', 'expanding cube related expressions');
    feladat{6}='all of them';
        PolszamJSCQs(PolszamgyakQuizPeldak(100, [3 3 5 1 1 1 1 4]),1, 'quiz4f.html', 'quiz4f.js', 'factorization in general');
        PolszamJSCQs(PolszamgyakQuizPeldak(100, [3 3 5 1 1 1 1 4]),2, 'quiz4e.html', 'quiz4e.js', 'expansion in general');            
end