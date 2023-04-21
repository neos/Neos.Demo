# NodeTypes and Nodes

NodeTypes and nodes are a concept of the Neos Content Repository (Neos CR). They serve the purpose of persisting and 
accessing content data that is edited in the Neos Backend and rendered when requesting a content page in the Neos 
frontend (and also in the backend preview). 

A NodeType is mainly responsible for defining the structure of a node of that NodeType. You can imagine NodeTypes and 
nodes as classes and instances in object-oriented programming, where NodeTypes are like classes and nodes are instances 
of one specific node type.

There are a few more things beside the structure of nodes that are defined by the NodeType as well:
 
 - labels and icons displayed in the Neos backend
 - NodeType constraints
 - NodeType inheritance
 - auto-created child nodes
 - editor settings for single node properties
 - ... and more generic options and configuration for external packages

Nodes live in the content repository (CR) which is a set of database tables. NodeTypes live in YAML files in your Neos
packages inside your project.

So basically, a node is a data structure that follows the following rules:

 - all nodes have a NodeType (special case: unstructured nodes)
 - each node has a set of properties, that are defined by the NodeType
 - properties...
   - are strictly typed
     - primitives: string, boolean, integer, ...
     - references to ImageVariant, Documents and other assets from the Neos Media module
     - references to other nodes
     - custom data types defined by you
   - may have a default value
   - may have editor settings that declare which editor is used in the Neos backend to manipulate that property 
     (f.e. single-line vs. textarea editor for string properties)
   - can be inline-editable (inside the content itself / wysiwyg) or inspector-editable 
     (on the right hand side of the Neos backend)
 - nodes inside the CR are a tree structure (composite)
   - each node, except the root node, has a parent node
   - each node can have an ordered list of child nodes
 - a node is unique by its context path, that consists of...
   - its position in the node-tree (node path)
   - the workspace it lives in
   - its content dimension values (f.e. Language: de vs. en)

## Basic NodeTypes - Documents and Content

The Neos core provides you with *two important base NodeTypes* that you should inherit from:
`Neos.Neos:Document` and `Neos.Neos:Content`. Internally, both of those types inherit from `Neos.Neos:Node` which
is the most basic NodeType out there.

The main difference between Document- and Content nodes is: Document nodes are reachable via URL and Content nodes are
usually placed on Documents.

In the Neos Backend you also see two trees: The Document tree (top left), which only shows instances of
`Neos.Neos:Document` and the Content tree, which only shows instances of `Neos.Neos:Content` that are children of the
currently selected Document node.

## NodeType constraints

On of the reasons why Neos is so user-friendly (a.k.a. editor happiness) is: when programmed correctly, the editors are
barely able to create content that has a malformed structure or breaks the design of a website. That can be done by 
using so-called *NodeType constraints*. Basically, you can define which NodeTypes are allowed or forbidden as child 
nodes.

Example:

Imagine two NodeTypes: ImageSlider and Slide

Via NodeType constraints you can define, that only instances of *Slide* can be created as child nodes of an 
*ImageSlider* node. With those constraints, the Neos Backend only provides the editor with the possibility to create
Slides inside an ImageSlider. So the editor:
 1. is simply not able to create structures that will break the styles or JS logic
 2. does not need an expensive training before start using the system

Other examples can be: you probably want to disable the editor to create:
 - nested multi-colum nodes
 - nested section nodes
 - ... and so on

By default, the NodeType constraints are a deny-list. You can change that behavior to an allow-list with a few lines of
YAML code. 

TODO: hier link auf Code einfügen

### Domain-driven Design with Neos (opinionated)

NodeType constraints (in combination with well-chosen NodeType names) can help you design a node structure that
fits perfectly into the customers' domain. For more specific information see also 
[Sebastian Kurfürst's talk at the NeosCon 2016](https://www.youtube.com/watch?v=9kgR6DzH-Fo).  


### TODO

- links Einfügen zu Doc/Referenzen
