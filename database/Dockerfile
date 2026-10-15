# Postgres com locale pt_BR: as colunas do tipo money usam o formato "R$ 1.234,56",
# que é o que utils/moneyOperations/convertMonetaryValue.js espera.
FROM postgres:17
RUN localedef -i pt_BR -c -f UTF-8 -A /usr/share/locale/locale.alias pt_BR.UTF-8
ENV LANG=pt_BR.utf8
