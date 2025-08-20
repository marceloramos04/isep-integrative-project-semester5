namespace Backoffice;

public class Utils
{
    public static int CompareStrings(string str1, string str2)
    {
        // Remover espaços em branco e converter para minúsculas
        string normalizedStr1 = str1.Trim().ToLower();
        string normalizedStr2 = str2.Trim().ToLower();

        return normalizedStr1.CompareTo(normalizedStr2);
    }
}