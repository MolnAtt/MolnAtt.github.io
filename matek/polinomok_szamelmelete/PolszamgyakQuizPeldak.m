function alakok= PolszamgyakQuizPeldak(ennyit, Eloszlas)

abc = 'abcdefghijklmnopqrstuvxyz';
 
 
 %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% Sára kódja, ot kell kérdezni! :)
        N = ennyit; % hány feladatot szeretnél
        feladatok = (1:8); 
        %Eloszlas: mi legyen az eloszlás, meg kell adni tetsz?leges számokat, amiknek az egymáshoz viszonyított aránya fogja meghatározni az adott feladattíus abszolút gyakoriságát
        x = (100/sum(Eloszlas))*.01;

        Hanydarab = zeros(1,length(unique(Eloszlas)));
        kulonbozok = unique(Eloszlas);

        for i = 1:length(kulonbozok)
           Hanydarab(1,i) = round(N*x*kulonbozok(i)*histc(Eloszlas,kulonbozok(i)));
        end


        Samples = randi([min(feladatok(Eloszlas(1,:) == kulonbozok(1))), max(feladatok(Eloszlas(1,:) == kulonbozok(1)))],1,Hanydarab(1));
        for j = 2:length(kulonbozok)
           Samples = [Samples, randi([min(feladatok(Eloszlas(1,:) == kulonbozok(j))), max(feladatok(Eloszlas(1,:) == kulonbozok(j)))],1,Hanydarab(j))];
        end

        if length(Samples) < N
           Samples = [Samples,randi([1,3],1,1)];
        end
        eztkeverd = Samples(1,1:N);
        polinomalaktipus = (eztkeverd(randperm(length(eztkeverd))))'; % ez egy Nx1-es mátrix, amiben az 1:8 elemei fordulnak el? az Eloszlas által megadott súlyozás szerint.
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
 
 Coding = [randi([2,5],ennyit,8), polinomalaktipus];
 % C: (3a+7b)(2c+5d)
 %      [3 1 7 2 3 5 4 8 2]
 % C(1): els? változó egyutthatója 
 % C(2): második változó helye az abc-ben
 % C(3): második változó egyutthatója 
 % C(4): második változó helye az abc-ben
 % C(5): harmadik változó egyutthatója 
 % C(6): harmadik változó helye az abc-ben
 % C(7): negyedik változó egyutthatója 
 % C(8): negyedik változó helye az abc-ben
 % C(9): mit csináljon:
 %   1: (a+b)^2 = a^2 + 2ab + b^2 
 %   2: (a-b)^2 = a^2 - 2ab + b^2 
 %   3: (a-b)(a+b) = a^2 - b^2 
 %   4: (a+b)(a^2-ab+b^2) = a^3 + b^3 
 %   5: (a-b)(a^2+ab+b^2) = a^3 - b^3 
 %   6: (a-b)^3 = a^3 - 3a^2b + 3ab^2 - b^3 
 %   7: (a+b)^3 = a^3 + 3a^2b + 3ab^2 + b^3 
 %   8: (a+b)(c+d) = (a+b)c + (a+b)d = ac + bc + ad + bd 

 polinomalak = cell(10,ennyit); % 10 sor minden alak, és minden új példa más oszlopba kerül
 szorzatalak = cell(10,ennyit);
 tipus ='';
 
for i = 1:ennyit;
    C = Coding(i,:);
 switch C(9)
    case 1
        tipus = '(A+B)^2';
        %--------------------------
        % POLINOM ALAK
        %helyes válasz
            polinomalak{1,i} = [num2str(C(1)^2), abc(C(2)), '^2', '+', num2str(2*C(1)*C(3)), abc(C(2)),abc(C(4)), '+', num2str(C(3)^2), abc(C(4)),'^2'];
        %helytelen válasz: 1-szeres vegyes tag
            polinomalak{2,i} = [num2str(C(1)^2), abc(C(2)), '^2', '+', num2str(C(1)*C(3)), abc(C(2)),abc(C(4)), '+', num2str(C(3)^2), abc(C(4)),'^2'];
        %helytelen válasz: ea-k nincsenek negyzeten
            polinomalak{3,i} = [num2str(C(1)), abc(C(2)), '^2', '+', num2str(2*C(1)*C(3)), abc(C(2)),abc(C(4)), '+', num2str(C(3)), abc(C(4)),'^2'];
        %helytelen válasz: nincs vegyes tag
            polinomalak{4,i} = [num2str(C(1)^2), abc(C(2)), '^2', '+', num2str(C(3)^2), abc(C(4)),'^2'];
        %helytelen válasz: 1-szeres vegyes tag, ea-k nincsenek negyzeten
             polinomalak{5,i} = [num2str(C(1)), abc(C(2)), '^2', '+', num2str(C(1)*C(3)), abc(C(2)),abc(C(4)), '+', num2str(C(3)), abc(C(4)),'^2'];
        %helytelen válasz: nincs vegyes tag, ea-k nincsenek negyzeten
            polinomalak{6,i} = [num2str(C(1)), abc(C(2)), '^2', '+', num2str(C(3)), abc(C(4)),'^2'];
        %helytelen válasz: \\mbox{egyik sem}
            polinomalak{7,i} = '\\mbox{egyik sem}';
        %--------------------------
        % SZORZAT ALAK hogy lehet elrontani a^2+2ab+b^2-et? 
            szorzatalak{1,i} = ['(', num2str(C(1)), abc(C(2)), '+', num2str(C(3)), abc(C(4)),')^2'];
        %helytelen válasz: negyzetes egyutthatok 
            szorzatalak{2,i} = ['(', num2str(C(1)^2), abc(C(2)), '+', num2str(C(3)^2), abc(C(4)),')^2'];
        %helytelen válasz
            szorzatalak{3,i} = '\\mbox{egyik sem}';
        %--------------------------
    case 2
        tipus = '(A-B)^2';
        %helyes válasz
            polinomalak{1,i} = [num2str(C(1)^2), abc(C(2)), '^2', '-', num2str(2*C(1)*C(3)), abc(C(2)),abc(C(4)), '+', num2str(C(3)^2), abc(C(4)),'^2'];
        %helytelen válasz: 1-szeres vegyes tag
            polinomalak{2,i} = [num2str(C(1)^2), abc(C(2)), '^2', '-', num2str(C(1)*C(3)), abc(C(2)),abc(C(4)), '+', num2str(C(3)^2), abc(C(4)),'^2'];
        %helytelen válasz: ea-k nincsenek negyzeten
            polinomalak{3,i} = [num2str(C(1)), abc(C(2)), '^2', '-', num2str(2*C(1)*C(3)), abc(C(2)),abc(C(4)), '+', num2str(C(3)), abc(C(4)),'^2'];
        %helytelen válasz: ea-k nincsenek negyzeten, dupla minusz
            polinomalak{4,i} = [num2str(C(1)), abc(C(2)), '^2', '-', num2str(2*C(1)*C(3)), abc(C(2)),abc(C(4)), '-', num2str(C(3)), abc(C(4)),'^2'];
        %helytelen válasz: nincs vegyes tag
            polinomalak{5,i} = [num2str(C(1)^2), abc(C(2)), '^2', '-', num2str(C(3)^2), abc(C(4)),'^2'];
        %helytelen válasz: 1-szeres vegyes tag, ea-k nincsenek negyzeten
             polinomalak{6,i} = [num2str(C(1)), abc(C(2)), '^2', '-', num2str(C(1)*C(3)), abc(C(2)),abc(C(4)), '+', num2str(C(3)), abc(C(4)),'^2'];
        %helytelen válasz: nincs vegyes tag, ea-k nincsenek negyzeten
            polinomalak{7,i} = [num2str(C(1)), abc(C(2)), '^2', '-', num2str(C(3)), abc(C(4)),'^2'];
        %helytelen válasz: dupla minusz
            polinomalak{8,i} = [num2str(C(1)^2), abc(C(2)), '^2', '-', num2str(2*C(1)*C(3)), abc(C(2)),abc(C(4)), '-', num2str(C(3)^2), abc(C(4)),'^2'];
        %helytelen válasz: \\mbox{egyik sem}
            polinomalak{9,i} = '\\mbox{egyik sem}';
        %--------------------------
        % SZORZAT ALAK
        %helyes válasz
            szorzatalak{1,i} = ['(', num2str(C(1)), abc(C(2)), '-', num2str(C(3)), abc(C(4)),')^2'];
        %helytelen válasz: negyzetes egyutthatok 
            szorzatalak{2,i} = ['(', num2str(C(1)^2), abc(C(2)), '-', num2str(C(3)^2), abc(C(4)),')^2'];
        %helytelen válasz: keveres 
            szorzatalak{3,i} = ['(', num2str(C(1)), abc(C(2)), '+', num2str(C(3)), abc(C(4)),')^2'];
        %helytelen válasz
            szorzatalak{4,i} = '\\mbox{egyik sem}';
        %--------------------------
    case 3
        tipus = '(A-B)(A+B)';
        %--------------------------
        % POLINOM ALAK
        %helyes válasz
            polinomalak{1,i} = [num2str(C(1)^2), abc(C(2)), '^2', '-', num2str(C(3)^2), abc(C(4)),'^2'];
        %helytelen válasz: ea-k nincsenek negyzeten
            polinomalak{2,i} = [num2str(C(1)), abc(C(2)), '^2', '-', num2str(C(3)), abc(C(4)),'^2'];
        %helytelen válasz: \\mbox{egyik sem}
            polinomalak{3,i} = '\\mbox{egyik sem}';
        %--------------------------
        % SZORZAT ALAK
        %helyes válasz
            szorzatalak{1,i} = ['(', num2str(C(1)), abc(C(2)), '-', num2str(C(3)), abc(C(4)),')','(', num2str(C(1)), abc(C(2)), '+', num2str(C(3)), abc(C(4)),')'];
        %helytelen válasz: keveres
            szorzatalak{2,i} = ['(', num2str(C(1)), abc(C(2)), '-', num2str(C(3)), abc(C(4)),')^2'];
        %helytelen válasz: ea-k
            szorzatalak{3,i} = ['(', num2str(C(1)^2), abc(C(2)), '-', num2str(C(3)^2), abc(C(4)),')','(', num2str(C(1)^2), abc(C(2)), '+', num2str(C(3)^2), abc(C(4)),')'];
        %helytelen válasz: ea-k, keveres
            szorzatalak{4,i} = ['(', num2str(C(1)^2), abc(C(2)), '-', num2str(C(3)^2), abc(C(4)),')^2'];
        %helytelen válasz
            szorzatalak{5,i} = '\\mbox{egyik sem}';
    case 4
        tipus = '(A-B)(A^2+AB+B^2)';
        %--------------------------
        % POLINOM ALAK
        %helyes válasz
            polinomalak{1,i} = [num2str(C(1)^3), abc(C(2)), '^3', '-', num2str(C(3)^3), abc(C(4)),'^3'];
        %helytelen válasz: ea-k nincsenek kobon
            polinomalak{2,i} = [num2str(C(1)), abc(C(2)), '^3', '-', num2str(C(3)), abc(C(4)),'^3'];
        %helytelen válasz: ea-k negyzeten
            polinomalak{3,i} = [num2str(C(1)^2), abc(C(2)), '^3', '-', num2str(C(3)^2), abc(C(4)),'^3'];
        %helytelen valasz: keveres a +-al
            polinomalak{4,i} = [num2str(C(1)^3), abc(C(2)), '^3', '+', num2str(C(3)^3), abc(C(4)),'^3'];
        %helytelen válasz: keveres es ea-k nincsenek kobon
            polinomalak{5,i} = [num2str(C(1)), abc(C(2)), '^3', '+', num2str(C(3)), abc(C(4)),'^3'];
        %helytelen válasz: keveres es ea-k negyzeten
            polinomalak{6,i} = [num2str(C(1)^2), abc(C(2)), '^3', '+', num2str(C(3)^2), abc(C(4)),'^3'];
        %helytelen válasz: \\mbox{egyik sem}
            polinomalak{7,i} = '\\mbox{egyik sem}';
        %--------------------------
        % SZORZAT ALAK hogyan lehet elrontani A^3-B^3-öt?
        %helyes válasz
            szorzatalak{1,i} = ['(', num2str(C(1)), abc(C(2)), '-', num2str(C(3)), abc(C(4)),')','(', num2str(C(1)^2), abc(C(2)),'^2', '+',num2str(C(1)*C(3)), abc(C(2)),abc(C(4)),'+',num2str(C(3)^2), abc(C(4)),'^2',')'];
        %helytelen válasz: keveres: - -
            szorzatalak{2,i} = ['(', num2str(C(1)), abc(C(2)), '-', num2str(C(3)), abc(C(4)),')','(', num2str(C(1)^2), abc(C(2)),'^2', '-',num2str(C(1)*C(3)), abc(C(2)),abc(C(4)),'+',num2str(C(3)^2), abc(C(4)),'^2',')'];
        %helytelen válasz: keveres: + -
            szorzatalak{3,i} = ['(', num2str(C(1)), abc(C(2)), '+', num2str(C(3)), abc(C(4)),')','(', num2str(C(1)^2), abc(C(2)),'^2', '-',num2str(C(1)*C(3)), abc(C(2)),abc(C(4)),'+',num2str(C(3)^2), abc(C(4)),'^2',')'];
        %helytelen válasz: tagonként
            szorzatalak{4,i} = ['(', num2str(C(1)), abc(C(2)), '-', num2str(C(3)), abc(C(4)),')^3'];
        %helytelen válasz: masodik tag teljes negyzet, rossz elojel
            szorzatalak{5,i} = ['(', num2str(C(1)), abc(C(2)), '-', num2str(C(3)), abc(C(4)),')','(', num2str(C(1)^2), abc(C(2)),'^2', '-',num2str(2*C(1)*C(3)), abc(C(2)),abc(C(4)),'+',num2str(C(3)^2), abc(C(4)),'^2',')'];
        %helytelen válasz: masodik tag teljes negyzet
            szorzatalak{6,i} = ['(', num2str(C(1)), abc(C(2)), '-', num2str(C(3)), abc(C(4)),')','(', num2str(C(1)^2), abc(C(2)),'^2', '+',num2str(2*C(1)*C(3)), abc(C(2)),abc(C(4)),'+',num2str(C(3)^2), abc(C(4)),'^2',')'];
        %helytelen válasz
            szorzatalak{7,i} = '\\mbox{egyik sem}';
    case 5
        tipus = '(A+B)(A^2-AB+B^2)';
        %--------------------------
        % POLINOM ALAK
        %helyes válasz
            polinomalak{1,i} = [num2str(C(1)^3), abc(C(2)), '^3', '+', num2str(C(3)^3), abc(C(4)),'^3'];
        %helytelen válasz: ea-k nincsenek kobon
            polinomalak{2,i} = [num2str(C(1)), abc(C(2)), '^3', '+', num2str(C(3)), abc(C(4)),'^3'];
        %helytelen válasz: ea-k negyzeten
            polinomalak{3,i} = [num2str(C(1)^2), abc(C(2)), '^3', '+', num2str(C(3)^2), abc(C(4)),'^3'];
        %helytelen válasz: keveres a minusszal
            polinomalak{4,i} = [num2str(C(1)^3), abc(C(2)), '^3', '-', num2str(C(3)^3), abc(C(4)),'^3'];
        %helytelen válasz: keveres es ea-k nincsenek kobon
            polinomalak{5,i} = [num2str(C(1)), abc(C(2)), '^3', '-', num2str(C(3)), abc(C(4)),'^3'];
        %helytelen válasz: keveres es ea-k negyzeten
            polinomalak{6,i} = [num2str(C(1)^2), abc(C(2)), '^3', '-', num2str(C(3)^2), abc(C(4)),'^3'];
        %helytelen válasz: \\mbox{egyik sem}
            polinomalak{7,i} = '\\mbox{egyik sem}';
        %--------------------------
        % SZORZAT ALAK
        %helyes válasz
            szorzatalak{1,i} = ['(', num2str(C(1)), abc(C(2)), '+', num2str(C(3)), abc(C(4)),')','(', num2str(C(1)^2), abc(C(2)),'^2', '-',num2str(C(1)*C(3)), abc(C(2)),abc(C(4)),'+',num2str(C(3)^2), abc(C(4)),'^2',')'];
        %helytelen válasz: keveres: - -
            szorzatalak{2,i} = ['(', num2str(C(1)), abc(C(2)), '-', num2str(C(3)), abc(C(4)),')','(', num2str(C(1)^2), abc(C(2)),'^2', '-',num2str(C(1)*C(3)), abc(C(2)),abc(C(4)),'+',num2str(C(3)^2), abc(C(4)),'^2',')'];
        %helytelen válasz: keveres: - +
            szorzatalak{3,i} = ['(', num2str(C(1)), abc(C(2)), '-', num2str(C(3)), abc(C(4)),')','(', num2str(C(1)^2), abc(C(2)),'^2', '+',num2str(C(1)*C(3)), abc(C(2)),abc(C(4)),'+',num2str(C(3)^2), abc(C(4)),'^2',')'];
        %helytelen válasz: keveres: + +
            szorzatalak{4,i} = ['(', num2str(C(1)), abc(C(2)), '+', num2str(C(3)), abc(C(4)),')','(', num2str(C(1)^2), abc(C(2)),'^2', '+',num2str(C(1)*C(3)), abc(C(2)),abc(C(4)),'+',num2str(C(3)^2), abc(C(4)),'^2',')'];
        %helytelen válasz: tagonként
            szorzatalak{5,i} = ['(', num2str(C(1)), abc(C(2)), '+', num2str(C(3)), abc(C(4)),')^3'];
        %helytelen válasz: masodik tag teljes negyzet
            szorzatalak{6,i} = ['(', num2str(C(1)), abc(C(2)), '+', num2str(C(3)), abc(C(4)),')','(', num2str(C(1)^2), abc(C(2)),'^2', '-',num2str(2*C(1)*C(3)), abc(C(2)),abc(C(4)),'+',num2str(C(3)^2), abc(C(4)),'^2',')'];
        %helytelen válasz
            szorzatalak{7,i} = '\\mbox{egyik sem}';
    case 6
        tipus = '(A+B)^3';
        %--------------------------
        % POLINOM ALAK
        %helyes válasz
            polinomalak{1,i} = [num2str(C(1)^3), abc(C(2)), '^3', '+', num2str(3*C(1)^2*C(3)), abc(C(2)), '^2', abc(C(4)), '+' , num2str(3*C(1)*C(3)^2), abc(C(2)), abc(C(4)),'^2','+',num2str(C(3)^3), abc(C(4)),'^3'];
        %helytelen válasz: 1-szeres vegyestagok
            polinomalak{2,i} = [num2str(C(1)^3), abc(C(2)), '^3', '+', num2str(1*C(1)^2*C(3)), abc(C(2)), '^2', abc(C(4)), '+' , num2str(1*C(1)*C(3)^2), abc(C(2)), abc(C(4)),'^2','+',num2str(C(3)^3), abc(C(4)),'^3'];
        %helytelen válasz: 1-szeres hatvanyozatlan ea-s vegyestagok
            polinomalak{3,i} = [num2str(C(1)^3), abc(C(2)), '^3', '+', num2str(1*C(1)*C(3)), abc(C(2)), '^2', abc(C(4)), '+' , num2str(1*C(1)*C(3)), abc(C(2)), abc(C(4)),'^2','+',num2str(C(3)^3), abc(C(4)),'^3'];
        %helytelen válasz: 3-szoros vegyestag
            polinomalak{4,i} = [num2str(C(1)^3), abc(C(2)), '^3', '+', num2str(3*C(1)*C(3)), abc(C(2)), abc(C(4)), '+',num2str(C(3)^3), abc(C(4)),'^3'];
        %helytelen válasz: nincs vegyes tag
            polinomalak{5,i} = [num2str(C(1)^3), abc(C(2)), '^3', '+',num2str(C(3)^3), abc(C(4)),'^3'];
        %helytelen válasz, ea-k nincsenek hatvanyozva
            polinomalak{6,i} = [num2str(C(1)), abc(C(2)), '^3', '+', num2str(3*C(1)*C(3)), abc(C(2)), '^2', abc(C(4)), '+' , num2str(3*C(1)*C(3)), abc(C(2)), abc(C(4)),'^2','+',num2str(C(3)), abc(C(4)),'^3'];
        %helytelen válasz: 1-szeres vegyestagok, ea-k nincsenek hatvanyozva
            polinomalak{7,i} = [num2str(C(1)), abc(C(2)), '^3', '+', num2str(1*C(1)*C(3)), abc(C(2)), '^2', abc(C(4)), '+' , num2str(1*C(1)*C(3)), abc(C(2)), abc(C(4)),'^2','+',num2str(C(3)), abc(C(4)),'^3'];
        %helytelen válasz: 1-szeres hatvanyozatlan ea-s vegyestagok, ea-k nincsenek hatvanyozva
            polinomalak{8,i} = [num2str(C(1)), abc(C(2)), '^3', '+', num2str(1*C(1)*C(3)), abc(C(2)), '^2', abc(C(4)), '+' , num2str(1*C(1)*C(3)), abc(C(2)), abc(C(4)),'^2','+',num2str(C(3)), abc(C(4)),'^3'];
        %helytelen válasz: 3-szoros vegyestag, ea-k nincsenek hatvanyozva
            polinomalak{9,i} = [num2str(C(1)), abc(C(2)), '^3', '+', num2str(3*C(1)*C(3)), abc(C(2)), abc(C(4)), '+',num2str(C(3)), abc(C(4)),'^3'];
        %helytelen válasz: nincs vegyes tag, ea-k nincsenek hatvanyozva
            polinomalak{10,i} = [num2str(C(1)), abc(C(2)), '^3', '+',num2str(C(3)), abc(C(4)),'^3'];
        %--------------------------
        % SZORZAT ALAK
        %helyes válasz
            szorzatalak{1,i} = ['(', num2str(C(1)), abc(C(2)), '+', num2str(C(3)), abc(C(4)),')^3'];
        %helytelen válasz ea-k 3-ra emelve
            szorzatalak{2,i} = ['(', num2str(C(1)^3), abc(C(2)), '+', num2str(C(3)^3), abc(C(4)),')^3'];
        %helytelen válasz ea-k 2-re emelve
            szorzatalak{3,i} = ['(', num2str(C(1)^2), abc(C(2)), '+', num2str(C(3)^2), abc(C(4)),')^3'];
         %helytelen válasz
            szorzatalak{4,i} = '\\mbox{egyik sem}';
   case 7
        tipus = '(A-B)^3';
        %--------------------------
        % POLINOM ALAK
        %helyes válasz
            polinomalak{1,i} = [num2str(C(1)^3), abc(C(2)), '^3', '-', num2str(3*C(1)^2*C(3)), abc(C(2)), '^2', abc(C(4)), '+' , num2str(3*C(1)*C(3)^2), abc(C(2)), abc(C(4)),'^2','-',num2str(C(3)^3), abc(C(4)),'^3'];
        %helytelen válasz: 1-szeres vegyestagok
            polinomalak{2,i} = [num2str(C(1)^3), abc(C(2)), '^3', '-', num2str(1*C(1)^2*C(3)), abc(C(2)), '^2', abc(C(4)), '+' , num2str(1*C(1)*C(3)^2), abc(C(2)), abc(C(4)),'^2','-',num2str(C(3)^3), abc(C(4)),'^3'];
        %helytelen válasz: 1-szeres hatvanyozatlan ea-s vegyestagok
            polinomalak{3,i} = [num2str(C(1)^3), abc(C(2)), '^3', '-', num2str(1*C(1)*C(3)), abc(C(2)), '^2', abc(C(4)), '+' , num2str(1*C(1)*C(3)), abc(C(2)), abc(C(4)),'^2','-',num2str(C(3)^3), abc(C(4)),'^3'];
        %helytelen válasz: 3-szoros vegyestag
            polinomalak{4,i} = [num2str(C(1)^3), abc(C(2)), '^3', '-', num2str(3*C(1)*C(3)), abc(C(2)), abc(C(4)), '-',num2str(C(3)^3), abc(C(4)),'^3'];
        %helytelen válasz: nincs vegyes tag
            polinomalak{5,i} = [num2str(C(1)^3), abc(C(2)), '^3', '-',num2str(C(3)^3), abc(C(4)),'^3'];
        %helytelen válasz, ea-k nincsenek hatvanyozva
            polinomalak{6,i} = [num2str(C(1)), abc(C(2)), '^3', '-', num2str(3*C(1)*C(3)), abc(C(2)), '^2', abc(C(4)), '+' , num2str(3*C(1)*C(3)), abc(C(2)), abc(C(4)),'^2','-',num2str(C(3)), abc(C(4)),'^3'];
        %helytelen válasz: 1-szeres vegyestagok, ea-k nincsenek hatvanyozva
            polinomalak{7,i} = [num2str(C(1)), abc(C(2)), '^3', '-', num2str(1*C(1)*C(3)), abc(C(2)), '^2', abc(C(4)), '+' , num2str(1*C(1)*C(3)), abc(C(2)), abc(C(4)),'^2','-',num2str(C(3)), abc(C(4)),'^3'];
        %helytelen válasz: 1-szeres hatvanyozatlan ea-s vegyestagok, ea-k nincsenek hatvanyozva
            polinomalak{8,i} = [num2str(C(1)), abc(C(2)), '^3', '-', num2str(1*C(1)*C(3)), abc(C(2)), '^2', abc(C(4)), '+' , num2str(1*C(1)*C(3)), abc(C(2)), abc(C(4)),'^2','-',num2str(C(3)), abc(C(4)),'^3'];
        %helytelen válasz: osszes vegyestag minuszos
            polinomalak{9,i} = [num2str(C(1)^3), abc(C(2)), '^3', '-', num2str(3*C(1)^2*C(3)), abc(C(2)), '^2', abc(C(4)), '-' , num2str(3*C(1)*C(3)^2), abc(C(2)), abc(C(4)),'^2','-',num2str(C(3)^3), abc(C(4)),'^3'];
        %helytelen válasz: nincs vegyes tag, ea-k nincsenek hatvanyozva
            polinomalak{10,i} = [num2str(C(1)), abc(C(2)), '^3', '-',num2str(C(3)), abc(C(4)),'^3'];
        %helytelen válasz: vegig minuszok
        %helytelen válasz
%            szorzatalak{5,i} = '\\mbox{egyik sem}';
        %--------------------------
        % SZORZAT ALAK
        %helyes válasz
            szorzatalak{1,i} = ['(', num2str(C(1)), abc(C(2)), '-', num2str(C(3)), abc(C(4)),')^3'];
        %helytelen válasz keveres
            szorzatalak{2,i} = ['(', num2str(C(1)), abc(C(2)), '+', num2str(C(3)), abc(C(4)),')^3'];
        %helytelen válasz ea-k 3-ra emelve
            szorzatalak{3,i} = ['(', num2str(C(1)^3), abc(C(2)), '+', num2str(C(3)^3), abc(C(4)),')^3'];
        %helytelen válasz ea-k 2-re emelve
            szorzatalak{4,i} = ['(', num2str(C(1)^2), abc(C(2)), '+', num2str(C(3)^2), abc(C(4)),')^3'];
        %helytelen válasz
            szorzatalak{5,i} = '\\mbox{egyik sem}';
    case 8
        tipus = '(A+B)(C+D)';
        %--------------------------
        % POLINOM ALAK
        %helyes válasz
            polinomalak{1,i} = [num2str(C(1)*C(5)), abc(C(6)), abc(C(2)), '+', num2str(C(3)*C(5)), abc(C(4)), abc(C(6)), '+', num2str(C(1)*C(7)), abc(C(2)), abc(C(8)), '+', num2str(C(3)*C(7)), abc(C(4)), abc(C(8))];
        %helytelen válasz: elsot az elsovel, masodikat a masodikkal
            polinomalak{2,i} = [num2str(C(1)*C(5)), abc(C(6)), abc(C(2)), '+', num2str(C(3)*C(7)), abc(C(4)), abc(C(8))];
        %helytelen válasz: zarojelek elhagyasa
            polinomalak{3,i} = [num2str(C(1)), abc(C(2)), '+', num2str(C(3)), abc(C(4)),'+', num2str(C(5)), abc(C(6)), '+', num2str(C(7)), abc(C(8))];
        %--------------------------
        % SZORZAT ALAK
        %helyes válasz
            szorzatalak{1,i} = [num2str(C(5)), abc(C(6)),'(', num2str(C(1)), abc(C(2)), '+', num2str(C(3)), abc(C(4)),')', '+', num2str(C(7)), abc(C(8)), '(', num2str(C(1)), abc(C(2)), '+', num2str(C(3)), abc(C(4)),') = (', num2str(C(1)), abc(C(2)), '+', num2str(C(3)), abc(C(4)),')','(', num2str(C(5)), abc(C(6)), '+', num2str(C(7)), abc(C(8)),')'];
        %helytelen válasz
            szorzatalak{2,i} = '\\mbox{egyik sem}';
 end
 %fprintf([polinomalak{1,i},'=',szorzatalak{1,i},'\n']) 
 fprintf(['------- ', num2str(i), '. kerdes, tipus: ', tipus, ' -------', char 10]) 
 fprintf(['         zarojelfelbontasi kerdesek: ', char 10]) 
    fprintf([szorzatalak{1,i},' === ',polinomalak{1,i}, char(10)]) 
 for j=2:10
    fprintf([szorzatalak{1,i},' =/= ',polinomalak{j,i}, char(10)]) 
 end
 fprintf(['         szorzatta alakitasi kerdesek: ', char 10]) 
    fprintf([polinomalak{1,i},' === ',szorzatalak{1,i}, char(10)]) 
 for j=2:10
    fprintf([polinomalak{1,i},' =/= ',szorzatalak{j,i}, char(10)]) 
 end
end

alakok = {polinomalak, szorzatalak};
end