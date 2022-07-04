Dies sind erste Testdaten für die Anwendung. Jeder Datensatz hat zusätzlich eine einge ID. Diese wird jedoch erst bei dem schreiben in die Datenbank erstellt und dem Datensatz mitgegeben.
Wenn ein Datensatz an das FE geliefert wird, wird diese ID mitgegeben. Das Frontend schickt neue Datensätze allerdings immer ohne diese ID, da diese vom BE generiert wird.
