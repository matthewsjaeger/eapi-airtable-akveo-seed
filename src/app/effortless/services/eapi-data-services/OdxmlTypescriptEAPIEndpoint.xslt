<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    xmlns:msxsl="urn:schemas-microsoft-com:xslt" exclude-result-prefixes="msxsl"
>
    <xsl:output method="xml" indent="yes"/>
    <xsl:include href="../CommonXsltTemplates.xslt" />
    <xsl:param name="output-filename" select="'output.txt'" />
    <xsl:param name="name" select="'-p name'" />
    <xsl:param name="lower-name" select="'-p lower-name'" />

    <xsl:template match="@* | node()">
        <xsl:copy>
            <xsl:apply-templates select="@* | node()"/>
        </xsl:copy>
    </xsl:template>

    <xsl:template match="/*">
        <FileSet>
            <FileSetFiles>
                <FileSetFile>
                    <RelativePath>
                        <xsl:value-of select="$output-filename"/>
                    </RelativePath>
                    <xsl:element name="FileContents" xml:space="preserve">/*
THIS FILE IS DERIVED - CHANGES WILL BE OVERWRITTEN (derived)
*/
import { EapiEndpointBase } from '../eapi-endpoint-base';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter, share } from 'rxjs/operators';
import { GDS } from '../../gds.service';

export class <xsl:value-of select="$name" />EndpointBase extends EapiEndpointBase {

    constructor(public gds: GDS) {
        super(gds)
    }

<xsl:for-each select="//ObjectDefs/ObjectDef">
<xsl:variable name="name" select="Name" />
<xsl:variable name="lower-name" select="translate($name, $ucletters, $lcletters)" />
<xsl:variable name="plural-name" xml:space="default">
<xsl:choose>
<xsl:when test="normalize-space(PluralName)!=''"><xsl:value-of select="PluralName"/></xsl:when>
<xsl:otherwise>
<xsl:call-template name="pluralize">
    <xsl:with-param name="word" select="$name" />
</xsl:call-template>
</xsl:otherwise>
</xsl:choose>

</xsl:variable>
<xsl:variable name="lower-plural-name" select="translate($plural-name, $ucletters, $lcletters)" />
    // HANDLERS FOR: <xsl:value-of select="$name" />
    public <xsl:value-of select="$lower-name" />: any = {};
    public <xsl:value-of select="$lower-plural-name" />: any[] = [];
    public <xsl:value-of select="$lower-plural-name" />ById: any = {};
    public <xsl:value-of select="$lower-name" />$: BehaviorSubject&lt;any[]> = new BehaviorSubject(null);
    public <xsl:value-of select="$lower-plural-name" />$: BehaviorSubject&lt;any[]> = new BehaviorSubject(null);

    public on<xsl:value-of select="$plural-name" />Change(): Observable&lt;any> {
        return this.<xsl:value-of select="$lower-plural-name" />$
            .pipe(
                filter(value => !!value),
                share(),
            );
    }

    public reload<xsl:value-of select="$plural-name" />(smqUser: any = null, sortField : string = '') {
        this.doReload(smqUser, '<xsl:value-of select="$name" />Id', '<xsl:value-of select="$lower-plural-name" />', '<xsl:value-of select="$plural-name" />', '', sortField);
    }

    public reload<xsl:value-of select="$plural-name" />Where(smqUser: any = null, airtableWhere : string, sortField : string = '') {
        this.doReload(smqUser, '<xsl:value-of select="$name" />Id', '<xsl:value-of select="$lower-plural-name" />', '<xsl:value-of select="$plural-name" />', airtableWhere, sortField);
    }

    public <xsl:value-of select="$lower-plural-name" />Sort(<xsl:value-of select="$lower-name" />A: any, <xsl:value-of select="$lower-name" />B: any) {
        return EapiEndpointBase.defaultSort(<xsl:value-of select="$lower-name" />A, <xsl:value-of select="$lower-name" />B);
    } 
</xsl:for-each>
}
</xsl:element>
                </FileSetFile>
            </FileSetFiles>
        </FileSet>
    </xsl:template>
</xsl:stylesheet>
