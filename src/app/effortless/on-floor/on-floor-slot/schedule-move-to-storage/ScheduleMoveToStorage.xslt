<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    xmlns:msxsl="urn:schemas-microsoft-com:xslt"
    xmlns:user="urn:my-scripts" exclude-result-prefixes="msxsl">

  <msxsl:script language="C#" implements-prefix="user">
    <![CDATA[
      public bool MatchUField(string str)
      {
          Match m = Regex.Match(str, "^U[0-9]+$", RegexOptions.IgnoreCase);
          return m.Success;
      }
      public string FilterForVarName(string str)
      {
          str = str.Replace(" ", "");
          str = str.Replace("#", "Number");
          str = str.Replace("/", "Or");
          str = str.Replace(":", "");
          return str;
      }
    ]]>
  </msxsl:script>
  
  <xsl:output method="xml" indent="yes"/>

  <xsl:param name="output-filename" select="'output.txt'" />

  <xsl:template match="@* | node()">
    <xsl:copy>
      <xsl:apply-templates select="@* | node()"/>
    </xsl:copy>
  </xsl:template>

  <xsl:template match="/">
    <FileSet>
      <FileSetFiles>
        <FileSetFile>
          <RelativePath>
            <xsl:text>schedule-move-to-storage.component.html</xsl:text>
          </RelativePath>
          <xsl:element name="FileContents" xml:space="preserve">
            
          
          </xsl:element>
        </FileSetFile>
      </FileSetFiles>
    </FileSet>
  </xsl:template>
</xsl:stylesheet>
