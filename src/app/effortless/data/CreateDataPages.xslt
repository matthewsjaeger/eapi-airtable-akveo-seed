<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    xmlns:msxsl="urn:schemas-microsoft-com:xslt" exclude-result-prefixes="msxsl"
>
    <xsl:output method="xml" indent="yes"/>

    <xsl:param name="output-filename" select="'output.txt'" />
    <xsl:include href="../CommonXsltTemplates.xslt" />
    <xsl:template match="@* | node()">
        <xsl:copy>
            <xsl:apply-templates select="@* | node()"/>
        </xsl:copy>
    </xsl:template>

    <xsl:template match="/*">
        <FileSet>
            <FileSetFiles>
                        <FileSetFile>
                <RelativePath>data.component.html</RelativePath>
                <OverwriteMode>Never</OverwriteMode>
                <FileContents><H2>Effortless Data</H2>

<p>The following links will allow you to explore (and edit) the data behind your EffortlessAPI.</p>

<ol>
    <xsl:for-each select="//ObjectDefs/ObjectDef"><xsl:variable name="od" select="." />
    <li>&lt;a (click)="goToData('<xsl:value-of select="translate($od/PluralName, $ucletters, $lcletters)" />')"><xsl:value-of select="$od/PluralName" />&lt;/a></li></xsl:for-each>
</ol>
</FileContents>
            </FileSetFile>

<xsl:for-each select="//ObjectDefs/ObjectDef"><xsl:variable name="od" select="." />
            <FileSetFile>
                <RelativePath><xsl:value-of select="translate($od/PluralName, $ucletters, $lcletters)" />/<xsl:value-of select="translate($od/PluralName, $ucletters, $lcletters)" />
                <xsl:text>.component.ts</xsl:text></RelativePath>
                <OverwriteMode>Never</OverwriteMode>
                <FileContents>import { Component, OnInit } from '@angular/core';
import { Router, Route, ActivatedRoute } from '@angular/router';
import { EffortlessComponentBase } from '../../efforless-base-component';
import { GDS } from '../../services/gds.service';
import { DataEndpoint } from '../../services/eapi-data-services/data-endpoint/data-endpoint';
import { NbMenuService } from '@nebular/theme';
import { Observable } from 'rxjs';

@Component({
  selector: 'eapi-data-<xsl:value-of select="translate($od/PluralName, $ucletters, $lcletters)" />',
  templateUrl: './<xsl:value-of select="translate($od/PluralName, $ucletters, $lcletters)" />.component.html',
  styleUrls: ['./<xsl:value-of select="translate($od/PluralName, $ucletters, $lcletters)" />.component.scss']
})
export class <xsl:value-of select="$od/PluralName" />Component extends EffortlessComponentBase implements OnInit {
  searchText : string = '';
  <xsl:value-of select="translate($od/PluralName, $ucletters, $lcletters)" />: any[] = [];
  filtered<xsl:value-of select="$od/PluralName" />: any;

  constructor(public gds : GDS, public data : DataEndpoint, public route : ActivatedRoute, 
            protected menuService : NbMenuService, public router : Router) { 
    super(gds, data, menuService);
    this.safeSubscribe(this.data.on<xsl:value-of select="$od/PluralName" />Change().subscribe(<xsl:value-of select="translate($od/PluralName, $ucletters, $lcletters)" /> => {
      this.<xsl:value-of select="translate($od/PluralName, $ucletters, $lcletters)" /> = <xsl:value-of select="translate($od/PluralName, $ucletters, $lcletters)" />;
      this.filterNow();
    }));
  }

  onGdsReady() {
    this.reload(this);
  }

  filterNow() {
    this.filtered<xsl:value-of select="$od/PluralName" /> = this.<xsl:value-of select="translate($od/PluralName, $ucletters, $lcletters)" />.filter(<xsl:value-of select="translate($od/Name, $ucletters, $lcletters)" /> => !this.searchText || <xsl:value-of select="translate($od/Name, $ucletters, $lcletters)" />.Name.toLowerCase().includes((this.searchText + '').toLowerCase()));      
  }

  reload(self: this) {
    this.data.reload<xsl:value-of select="$od/PluralName" />(this.gds.smqUser);
  }

  goTo<xsl:value-of select="$od/Name" />(id) {
    this.router.navigateByUrl('effortless/data/<xsl:value-of select="translate($od/PluralName, $ucletters, $lcletters)" />/<xsl:value-of select="translate($od/Name, $ucletters, $lcletters)" />/' + id);
  }
}
</FileContents>
            </FileSetFile>
            <FileSetFile>
                <RelativePath><xsl:value-of select="translate($od/PluralName, $ucletters, $lcletters)" />/<xsl:value-of select="translate($od/PluralName, $ucletters, $lcletters)" />
                <xsl:text>.component.spec.ts</xsl:text></RelativePath>
                <OverwriteMode>Never</OverwriteMode>
                <FileContents></FileContents>
            </FileSetFile>
            <FileSetFile>
                <RelativePath><xsl:value-of select="translate($od/PluralName, $ucletters, $lcletters)" />/<xsl:value-of select="translate($od/PluralName, $ucletters, $lcletters)" />
                <xsl:text>.component.scss</xsl:text></RelativePath>
                <OverwriteMode>Never</OverwriteMode>
                <FileContents></FileContents>
            </FileSetFile>
            <FileSetFile>
                <RelativePath><xsl:value-of select="translate($od/PluralName, $ucletters, $lcletters)" />/<xsl:value-of select="translate($od/PluralName, $ucletters, $lcletters)" />
                <xsl:text>.component.html</xsl:text></RelativePath>
                <OverwriteMode>Never</OverwriteMode>
                <FileContents>&lt;reload-widget [self]="this" [loading]="loading" [reloadHandler]="reload">&lt;/reload-widget>
&lt;input nbInput type="text" [(ngModel)]="searchText" placeholder="Filter <xsl:value-of select="$od/PluralName" />" class="float-right" (change)="filterNow()" />
<h2><xsl:value-of select="$od/PluralName" /></h2>
<nb-list>
  &lt;nb-list-item *ngFor="let <xsl:value-of select="translate($od/Name, $ucletters, $lcletters)" /> of filtered<xsl:value-of select="$od/PluralName" />" style="padding: 1em;">
    {{ <xsl:value-of select="translate($od/Name, $ucletters, $lcletters)" />.Name }}
    &lt;a nbButton class="float-right" size="tiny" (click)="goTo<xsl:value-of select="$od/Name" />(<xsl:value-of select="translate($od/Name, $ucletters, $lcletters)" />.<xsl:value-of select="$od/Name" />Id)">
      <nb-icon icon="external-link"></nb-icon>
    &lt;/a>
  &lt;/nb-list-item>
</nb-list></FileContents>
            </FileSetFile>
            <FileSetFile>
                <RelativePath><xsl:value-of select="translate($od/PluralName, $ucletters, $lcletters)" />/<xsl:value-of select="translate($od/Name, $ucletters, $lcletters)" />/<xsl:value-of select="translate($od/Name, $ucletters, $lcletters)" />
                <xsl:text>.component.ts</xsl:text></RelativePath>
                <OverwriteMode>Never</OverwriteMode>
                <FileContents>import { Component, OnInit } from '@angular/core';
import { Router, Route, ActivatedRoute } from '@angular/router';
import { EffortlessComponentBase } from '../../../efforless-base-component';
import { GDS } from '../../../services/gds.service';
import { DataEndpoint } from '../../../services/eapi-data-services/data-endpoint/data-endpoint';
import { NbMenuService, NbToastrService } from '@nebular/theme';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

@Component({
  selector: 'eapi-data-<xsl:value-of select="translate($od/Name, $ucletters, $lcletters)" />',
  templateUrl: './<xsl:value-of select="translate($od/Name, $ucletters, $lcletters)" />.component.html',
  styleUrls: ['./<xsl:value-of select="translate($od/Name, $ucletters, $lcletters)" />.component.scss']
})
export class <xsl:value-of select="$od/Name" />Component extends EffortlessComponentBase implements OnInit {
  <xsl:value-of select="translate($od/Name, $ucletters, $lcletters)" />$: Observable&lt;any>;
  id: any;
  config: any;
  mySchema: any;

  constructor(public gds : GDS, public data : DataEndpoint, public route : ActivatedRoute, 
            protected toastr : NbToastrService, protected menuService : NbMenuService, public router : Router) { 
    super(gds, data, menuService);
    this.<xsl:value-of select="translate($od/Name, $ucletters, $lcletters)" />$ = this.data.on<xsl:value-of select="$od/Name" />Change();
    this.safeSubscribe(this.<xsl:value-of select="translate($od/Name, $ucletters, $lcletters)" />$.subscribe(data => {
      this.loading = false;
    }));
    
    this.config = {};
    this.mySchema = {
      "definitions": {},
      "$schema": "http://json-schema.org/draft-07/schema#",
      "$id": "http://example.com/root.json",
      "type": "object",
      "title": "The Root Schema",
      "required": [<xsl:for-each select="PropertyDefs/PropertyDef">
        "<xsl:value-of select="Name" />",</xsl:for-each>
      ],
      "properties": {<xsl:for-each select="PropertyDefs/PropertyDef">
        "<xsl:value-of select="Name" />": {
          "$id": "#/properties/<xsl:value-of select="Name" />",
          "type": "string",
          "title": "The <xsl:value-of select="Name" /> Schema",
          "default": "",
          "examples": [
            "abc"
          ],
          "pattern": "^(.*)$"
        },</xsl:for-each>
      }
    };
  }

  
  save() {
    var payload = this.gds.createPayload();
    payload.<xsl:value-of select="$od/Name" /> = this.data.<xsl:value-of select="translate($od/Name, $ucletters, $lcletters)" />;
    this.gds.smqUser.Update<xsl:value-of select="$od/Name" />(payload)
        .then(reply => {
          this.data.<xsl:value-of select="translate($od/Name, $ucletters, $lcletters)" /> = reply.<xsl:value-of select="$od/Name" />;
          this.toastr.show('<xsl:value-of select="$od/Name" /> Saved...');
        });
  }

  onGdsReady() {
    this.route.params.pipe(take(1)).subscribe(params => {
      this.id = params['<xsl:value-of select="translate($od/Name, $ucletters, $lcletters)" />Id'];
      this.reload(this);
    });
  }

  reload(self: this) {
    self.loading = true;
    this.data.reload<xsl:value-of select="$od/Name" />Where(this.gds.smqUser, "RECORD_ID()='" + this.id + "'");
  }
}
</FileContents>
            </FileSetFile>
            <FileSetFile>
                <RelativePath><xsl:value-of select="translate($od/PluralName, $ucletters, $lcletters)" />/<xsl:value-of select="translate($od/Name, $ucletters, $lcletters)" />/<xsl:value-of select="translate($od/Name, $ucletters, $lcletters)" />
                <xsl:text>.component.spec.ts</xsl:text></RelativePath>
                <OverwriteMode>Never</OverwriteMode>
                <FileContents></FileContents>
            </FileSetFile>
            <FileSetFile>
                <RelativePath><xsl:value-of select="translate($od/PluralName, $ucletters, $lcletters)" />/<xsl:value-of select="translate($od/Name, $ucletters, $lcletters)" />/<xsl:value-of select="translate($od/Name, $ucletters, $lcletters)" />
                <xsl:text>.component.scss</xsl:text></RelativePath>
                <OverwriteMode>Never</OverwriteMode>
                <FileContents></FileContents>
            </FileSetFile>
            <FileSetFile>
                <RelativePath><xsl:value-of select="translate($od/PluralName, $ucletters, $lcletters)" />/<xsl:value-of select="translate($od/Name, $ucletters, $lcletters)" />/<xsl:value-of select="translate($od/Name, $ucletters, $lcletters)" />
                <xsl:text>.component.html</xsl:text></RelativePath>
                <OverwriteMode>Never</OverwriteMode>
                <FileContents><h2>
{{ (<xsl:value-of select="translate($od/Name, $ucletters, $lcletters)" />$ | async)?.Name }} Summary
</h2>
&lt;button nbButton (click)="save()">Save&lt;/button>
&lt;json-editor [(record)]="data.<xsl:value-of select="translate($od/Name, $ucletters, $lcletters)" />" [config]=" config" [schema]="mySchema">&lt;/json-editor>
          </FileContents>
            </FileSetFile>
</xsl:for-each>
                <FileSetFile>
                    <RelativePath>
                        <xsl:text>derived-data-declarations.ts</xsl:text>
                    </RelativePath>
                    <xsl:element name="FileContents" xml:space="preserve">import { DataComponent } from './data.component';
<xsl:for-each select="//ObjectDefs/ObjectDef"><xsl:variable name="od" select="." />
import { <xsl:value-of select="$od/PluralName" />Component } from "./<xsl:value-of select="translate($od/PluralName, $ucletters, $lcletters)" />/<xsl:value-of select="translate($od/PluralName, $ucletters, $lcletters)" />.component";
import { <xsl:value-of select="$od/Name" />Component } from './<xsl:value-of select="translate($od/PluralName, $ucletters, $lcletters)" />/<xsl:value-of select="translate($od/Name, $ucletters, $lcletters)" />/<xsl:value-of select="translate($od/Name, $ucletters, $lcletters)" />.component';</xsl:for-each>


export class DerivedDataDeclarations {
    static derivedDeclarations = [
<xsl:for-each select="//ObjectDefs/ObjectDef"><xsl:variable name="od" select="." />
        <xsl:value-of select="$od/PluralName" />Component,
        <xsl:value-of select="$od/Name" />Component,</xsl:for-each>
    ]

    static derivedPages: any[] = [
        {
            path: 'data',
            component: DataComponent,
        },
<xsl:for-each select="//ObjectDefs/ObjectDef"><xsl:variable name="od" select="." />
        {
            path: 'data/<xsl:value-of select="translate($od/PluralName, $ucletters, $lcletters)" />',
            component: <xsl:value-of select="$od/PluralName" />Component,
        },
        {
            path: 'data/<xsl:value-of select="translate($od/PluralName, $ucletters, $lcletters)" />/<xsl:value-of select="translate($od/Name, $ucletters, $lcletters)" />',
            component: <xsl:value-of select="$od/Name" />Component
        },
        {
            path: 'data/<xsl:value-of select="translate($od/PluralName, $ucletters, $lcletters)" />/<xsl:value-of select="translate($od/Name, $ucletters, $lcletters)" />/:<xsl:value-of select="translate($od/Name, $ucletters, $lcletters)" />Id',
            component: <xsl:value-of select="$od/Name" />Component
        },</xsl:for-each>
    ];
};

</xsl:element>
                </FileSetFile>
            </FileSetFiles>
        </FileSet>
    </xsl:template>
</xsl:stylesheet>
